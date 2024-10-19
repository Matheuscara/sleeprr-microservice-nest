import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email?: string;
}
