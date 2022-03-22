import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { IamportService } from '../iamport/iamport.service';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
    private readonly iamportservice: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async createPointTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    //검증로직 필요
    //1. 아임포트에 요청해서 결제 완료 기록이 존재하는지 확인
    const token = await this.iamportservice.getToken();
    await this.iamportservice.checkPaid({ impUid, amount, token });
    //2. pointTransaction테이블에는 impUid가 한번만 존재해야 함(중복결제 체크)
    await this.pointTransactionService.checkDuplicate({ impUid }); //디비로 연결되는 지점에 Lock걸어주기 ‼
    return this.pointTransactionService.create({
      impUid,
      amount,
      currentUser,
    });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async cancelPointTransaction(
    @Args('impUid') impUid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    //1 이미 취소된 건인지
    await this.pointTransactionService.checkAlreadyCanceled({ impUid });
    //2 취소하기에 충분한 포인트 잔액이 남았는지
    await this.pointTransactionService.checkHasCancelablePoint({
      impUid,
      currentUser,
    });
    //3 실제로 아임포트에 취소 요청
    const token = await this.iamportservice.getToken();
    const canceledAmount = await this.iamportservice.cancelPaid({
      impUid,
      token,
    });
    //4 pointTransaction테이블에서 결제 취소 등록하기
    return await this.pointTransactionService.cancel({
      impUid,
      amount: canceledAmount,
      currentUser,
    });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async paymentPointTransaction(
    // @Args('sharedId') sharedId: string, //족보 아이디
    @Args('userId') userId: string, // 족보 작성한 유저 정보
    @Args('point') point: number, //주고받는 포인트
    @CurrentUser() currentUser: ICurrentUser, //보내는 유저 정보
  ) {
    //결제하기에 충분한 포인트 잔액이 남았는지
    await this.pointTransactionService.checkPoint({ currentUser });
    //셀프로 후원하는게 아닌지
    await this.pointTransactionService.checkSelf({ currentUser, userId });
    //받는 유저가 존재하는 유저인지 확인
    await this.pointTransactionService.checkUser({ userId });
    //내 포인트 차감 데이터 저장 - 히스토리 저장 + 상태표시
    //받는사람 포인트 증가 - 히스토리 저장 + 상태표시
    return this.pointTransactionService.paidPoint({
      point,
      currentUser,
      userId,
    });
  }
}
