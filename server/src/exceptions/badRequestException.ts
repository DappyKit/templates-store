import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(customMessage: string, errorDetails: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: customMessage,
        error: errorDetails,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
