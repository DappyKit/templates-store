import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateApplicationDto } from '../../applications/dto/create-application.dto';
import { ApplicationService } from './application.service';

@Controller('applications')
export class ApplicationsController {

    constructor(private _appService: ApplicationService) {}

    @Post('create')
    @HttpCode(204)
    create(@Body() createApplicationDto: CreateApplicationDto): Promise<any> {
        return this._appService.createApplication(createApplicationDto);
    }

    @Get(':userId')
    @HttpCode(200)
    getUserApplications(@Param('userId') userId: number): Promise<any> {
       return this._appService.findApplicationsByUserId(userId);
    }

}
