import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationService } from './application.service';

@Controller('applications')
export class ApplicationsController {

    constructor(private _appService: ApplicationService) {}

    @Post('create')
    @HttpCode(204)
    create(@Body() createApplicationDto: CreateApplicationDto): Promise<any> {
        console.log('server got request:', createApplicationDto);
        return this._appService.createApplication(createApplicationDto);

        
    }

}
