import { EmailService } from './email.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('email')
@ApiTags('发送电子邮箱')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get('/:email')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    description: '电子邮箱',
    name: 'email',
  })
  sendEmail(@Param('email') email: string) {
    return this.emailService.sendEmail(email);
  }
}
