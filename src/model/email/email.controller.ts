import { ResponseEmail } from './email.interce';
import { EmailService } from './email.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ErrorResponse } from 'src/service/interface';

@Controller('email')
@ApiBadGatewayResponse({
  description: '请求失败',
  status: 500,
  type: ErrorResponse,
})
@ApiTags('发送电子邮箱')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get('/:email')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @ApiResponse({
    description: '请求成功',
    status: 200,
    type: ResponseEmail,
  })
  @ApiParam({
    description: '电子邮箱',
    name: 'email',
  })
  sendEmail(@Param('email') email: string) {
    return this.emailService.sendEmail(email);
  }
}
