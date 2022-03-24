import { Query, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async createBoard(
    @CurrentUser() currentUser: ICurrentUser, //
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
    @Args('scheduleId') scheduleId: string,
  ) {
    return await this.boardService.create(scheduleId, {
      ...createBoardInput,
    });
  }
}
