import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service';
import { ProcessEmailDTO } from './dto/process-email.dto';
import { Response } from 'express';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('process')
  async process(@Body() createEmailDto: ProcessEmailDTO, @Res() res: Response) {
    try {
      const response = await this.emailService.processEmail(createEmailDto);
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const status = error.getStatus ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || 'Internal Server Error';
      return res.status(status).json({
        statusCode: status,
        message: message,
      });
    }
  }
}
