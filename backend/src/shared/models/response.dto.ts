import { HttpStatus } from '@nestjs/common';

export class ResponseDto {
  constructor(_status: HttpStatus, _payload?: any, _error?: string) {
    this.error = _error;
    this.payload = _payload;
    this.status = _status;
  }

  payload?: any;
  status: HttpStatus;
  error?: string;
}
