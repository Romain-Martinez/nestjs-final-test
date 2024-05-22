import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddUserDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string;
}
