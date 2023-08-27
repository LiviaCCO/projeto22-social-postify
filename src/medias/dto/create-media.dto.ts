import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  username: string;

  @IsUrl()
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  title: string;
}

