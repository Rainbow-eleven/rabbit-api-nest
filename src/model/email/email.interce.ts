import { ApiProperty } from '@nestjs/swagger';

export class CodeType {
  code: number;
}
export class ResponseEmail {
  @ApiProperty({
    type: CodeType,
    example: {
      code: 'xxxx',
    },
  })
  data: {
    code: number;
  };
  @ApiProperty({
    example: 200,
  })
  statusCode: number;
  @ApiProperty()
  message: string;
}
