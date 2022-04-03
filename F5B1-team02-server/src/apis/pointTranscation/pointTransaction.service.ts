import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { PointTransaction } from './entities/pointTransaction.entity';
import {
  PointHistory,
  POINT_TRANSACTION_STATUS_ENUM,
} from '../pointHistory/entities/pointHistory.entity';
// import { SharedList } from '../sharedList/entities/sharedList.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PointHistory)
    private readonly pointHistoryRepository: Repository<PointHistory>,
    // @InjectRepository(SharedList)
    // private readonly sharedListRepository: Repository<SharedList>,

    private readonly connection: Connection,
  ) {}

  async checkDuplicate({ impUid }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const result = await this.pointTransactionRepository.findOne(
        { impUid },
        { lock: { mode: 'pessimistic_write' } },
      );
      if (result) throw new ConflictException('이미 결제되었습니다');
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async create({
    impUid,
    amount,
    currentUser,
    status = POINT_TRANSACTION_STATUS_ENUM.CHARGE,
  }) {
    //크리에이트에 락 걸기
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      //1. pointTransaction테이블에 거래기록 생성
      const pointTransaction = await this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
      });
      await queryRunner.manager.save(pointTransaction);

      // const pointId = await this.pointTransactionRepository.findOne({
      //   id: pointTransaction.id,
      // });
      // console.log('11111111', pointId);
      // 1-2. historyTransaction테이블에 변경 금액, 상태 생성
      const user = await queryRunner.manager.findOne(User, {
        id: currentUser.id,
      });
      const historyTransaction = await this.pointHistoryRepository.create({
        // pointId: pointId,
        current: user.point + amount,
        status,
        changed: amount,
        user: currentUser,
      });
      console.log(`changed:${historyTransaction.changed}`);
      console.log(`pointTransaction:${pointTransaction}`);
      await queryRunner.manager.save(historyTransaction);
      console.log(`historyTransaction:${historyTransaction}`);
      //2. 유저 정보 조회

      console.log(user);
      //3. 유저의 돈 업데이트
      const newUser = await this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      //4. 최종결과 돌려주기
      await queryRunner.manager.save(newUser);
      await queryRunner.commitTransaction();
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async checkAlreadyCanceled({ impUid }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      impUid,
    });
    const pointHistory = await this.pointHistoryRepository.findOne({
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    if (pointTransaction && pointHistory) throw new ConflictException();
  }

  async checkHasCancelablePoint({ impUid, currentUser }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      impUid,
      user: { id: currentUser.id },
    });
    const pointHistory = await this.pointHistoryRepository.findOne({
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    if (!pointTransaction && !pointHistory)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');
    const user = await this.userRepository.findOne({ id: currentUser.id });
    if (user.point < pointTransaction.amount)
      throw new UnprocessableEntityException('포인트 부족');
  }

  async cancel({ impUid, amount, currentUser }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const pointTransaction = await this.create({
        impUid,
        amount: -amount,
        currentUser,
      });
      const pointHistory = await this.pointHistoryRepository.create({
        status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      });
      await queryRunner.manager.save(pointTransaction);
      await queryRunner.manager.save(pointHistory);
      await queryRunner.commitTransaction();
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async checkPoint({ currentUser }) {
    const pointTransacion = await this.pointTransactionRepository.findOne(
      { user: { id: currentUser.id } },
      // { lock: { mode: 'pessimistic_write' } },
    );
    const user = await this.userRepository.findOne({ id: currentUser.id });
    if (user.point < pointTransacion.amount)
      throw new UnprocessableEntityException('포인트 부족');
  }
  async checkSelf({ currentUser, userId }) {
    // const payUser = await this.userRepository.findOne({ id: currentUser.id });
    // console.log('2222', currentUser.id, userId);
    // const earnUser = await this.sharedListRepository.findOne({ user: userId });
    // console.log('333', payUser, earnUser);
    if (currentUser.id === userId)
      throw new UnprocessableEntityException('포인트를 후원할 수 없습니다');
  }
  async checkUser({ userId }) {
    // const user = await this.userRepository.findOne({ id: userId });
    // console.log(userId, 'ddd', user);
    if (!userId)
      throw new UnprocessableEntityException('존재하지 않는 사용자입니다.');
  }
  async paidPoint({ point, currentUser, userId }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      //currentUser 포인트 차감/ 히스토리 테이블 저장 + 상태표시
      const payUserfind = await queryRunner.manager.findOne(User, {
        id: currentUser.id,
      });
      const usePointTransacion = this.pointHistoryRepository.create({
        user: currentUser.id,
        changed: -point,
        current: payUserfind.point - point,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(usePointTransacion);

      // const payPointHistory = this.pointHistoryRepository.create({
      //   status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      // });

      // await queryRunner.manager.save(payPointHistory);

      console.log('111', usePointTransacion);

      const payUser = this.userRepository.create({
        id: currentUser.id,
        point: payUserfind.point - point,
      });
      await queryRunner.manager.save(payUser);

      // console.log('333', payPointHistory);
      // console.log('+++++++', userId);

      const earnUserfind = await queryRunner.manager.findOne(User, {
        id: userId,
      });
      //받는 유저 포인트 증가 / 히스토리 테이블 저장 + 상태표시
      const earnPointTransaction = this.pointHistoryRepository.create({
        user: userId,
        changed: point,
        current: earnUserfind.point + point,
        status: POINT_TRANSACTION_STATUS_ENUM.EARN,
      });
      await queryRunner.manager.save(earnPointTransaction);
      // console.log(earnPointTransaction);

      console.log('222', earnUserfind);
      const earnUser = this.userRepository.create({
        id: userId,
        point: earnUserfind.point + point,
      });
      await queryRunner.manager.save(earnUser);

      // const earnPointHistory = this.pointHistoryRepository.create({
      //   status: POINT_TRANSACTION_STATUS_ENUM.EARN,
      // });
      // await queryRunner.manager.save(earnPointHistory);
      await queryRunner.commitTransaction();
      return earnUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
