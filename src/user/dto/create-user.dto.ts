// This class defines the expected payload for the POST /user request.
// Add properties here to specify what fields are required in the request body.
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
