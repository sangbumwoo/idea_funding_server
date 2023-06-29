import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly BoardSatus = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't valid status options.`);
    }
    return value;
  }

  private isStatusValid(value: any) {
    const index = this.BoardSatus.indexOf(value);
    return index !== -1;
  }
}
