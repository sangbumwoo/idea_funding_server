import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Board')
@ApiBearerAuth('access-token') //JWT 토큰 키 설정
@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @ApiOperation({
    summary: '전체 보드 조회',
    description: '전체 보드 조회 API',
  })
  @Get()
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(
  //     @Body() createBoardDto: CreateBoardDto
  // ): Board {
  //     return this.boardsService.createBoard(createBoardDto);
  // }

  @ApiOperation({
    summary: '보드 생성',
    description: '보드 생성 API',
  })
  @Post()
  @ApiCreatedResponse({ type: Board })
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //     return this.boardsService.getBoardById(id);
  // }

  @ApiOperation({
    summary: 'id로 보드 찾기',
    description: 'id로 보드 찾기 API',
  })
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @ApiOperation({
    summary: 'id로 보드 삭제',
    description: 'id로 보드 삭제 API',
  })
  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string):void {
  //     this.boardsService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
  // ) {
  //     return this.boardsService.updateBoardStatus(id, status);
  // }

  @ApiOperation({
    summary: 'id로 보드상태 수정',
    description: 'id로 보드상태 수정 API',
  })
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardService(id, status);
  }
}
