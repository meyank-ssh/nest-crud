import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    first_name:string;

    @IsOptional()
    @IsString()
    last_name:string;

    @IsOptional()
    @IsEmail()
    email:string;

}
