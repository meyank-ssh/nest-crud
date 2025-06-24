import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto):Promise<number> {
    const existingUser = await this.userService.findOne(createUserDto.email);
    if(existingUser){
      throw new InternalServerErrorException({message:'User already exists',status:500});
    }
    const user = await this.userService.create(createUserDto);
    return user.id;
  } 

  @Get()
  async findAll():Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number):Promise<User> {
    const user = await this.userService.findOneById(+id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto):Promise<User> {
    const user = await this.userService.findOneById(+id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    await this.userService.update(+id, updateUserDto);
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: number):Promise<User> {
    const user = await this.userService.findOneById(+id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    await this.userService.remove(+id);
    return user;
  }
}
