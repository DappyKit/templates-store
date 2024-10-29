import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions";

export class ForbiddenException extends HttpException {

    constructor(customMessage: string) {
        super(
            {
                statusCode: HttpStatus.FORBIDDEN,
                message: customMessage,
                error: 'Forbidden',
            },
            HttpStatus.FORBIDDEN,
        );
    }
}