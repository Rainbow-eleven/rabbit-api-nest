import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OSSService } from '@nest-public/nest-oss';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
@Controller()
export class ToolController {
  constructor(private readonly oSSService: OSSService) {}

  @Post('upload')
  @ApiTags('头像上传')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '单个图片上传',
    type: FileUploadDto,
  })
  @UseInterceptors(FilesInterceptor('file'))
  public async uploadOSS(@UploadedFiles() file) {
    const result = await this.oSSService.upload(file);
    return result[0];
  }
}
