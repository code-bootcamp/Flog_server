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
    // //2. pointTransaction테이블에는 impUid가 한번만 존재해야 함(중복결제 체크)
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
    await this.pointTransactionService.checkAlreadyCanceled({ impUid });
    await this.pointTransactionService.checkHasCancelablePoint({
      impUid,
      currentUser,
    });
    const token = await this.iamportservice.getToken();
    const canceledAmount = await this.iamportservice.cancelPaid({
      impUid,
      token,
    });
    return await this.pointTransactionService.cancel({
      impUid,
      amount: canceledAmount,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async paymentPointTransaction(
    @Args('userId') userId: string, // 족보 작성한 유저 정보
    @Args('point') point: number, //주고받는 포인트
    @CurrentUser() currentUser: ICurrentUser, //보내는 유저 정보
  ) {
    await this.pointTransactionService.checkPoint({ currentUser });
    await this.pointTransactionService.checkSelf({ currentUser, userId });
    await this.pointTransactionService.checkUser({ userId });
    return this.pointTransactionService.paidPoint({
      point,
      currentUser,
      userId,
    });
  }
}
