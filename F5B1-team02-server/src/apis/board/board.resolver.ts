import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board } from './entities/board.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Board])
  async fetchBoard(
    @Args('scheduleId') scheduleId: string, //
  ) {
    return await this.boardService.findMyQt({ scheduleId });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
    @Args('scheduleId') scheduleId: string,
  ) {
    return await this.boardService.create(scheduleId, {
      ...createBoardInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async updateBoard(
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
    @Args('boardId') boardId: string,
  ) {
    return await this.boardService.update(boardId, {
      ...updateBoardInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteBoard(@Args('scheduleId') scheduleId: string) {
    return await this.boardService.delete({ scheduleId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async uploadBoardImagefile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return await this.boardService.upload({ file });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async deleteBoardImagefile(
    @Args('url') url: string, //
  ) {
    return await this.boardService.deleteImageFile({ url });
  }
}
