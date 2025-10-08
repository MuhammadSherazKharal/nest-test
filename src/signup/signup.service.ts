import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './signup.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
@Injectable()
export class SignupService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,) { }
    async signUp(name: string, phone: string, email: string, password: string) {


        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = this.userRepo.create({ name, phone, email, password: hashedPassword });
        const saveuser = await this.userRepo.save(newUser);
        return { name: saveuser.name, email: saveuser.email };
    }


    async findAll(): Promise<any[]> {
        const users = await this.userRepo.find();
        return users.map(({ password, ...rest }) => rest);
    }


    async updateUser(id: string, name?: string, phone?: string, email?: string): Promise<any> {
        const user = await this.userRepo.findOne({ where: { id } });

        if (!user) {
            throw new Error('User not found');
        }
        if (name !== undefined) {
            user.name = name;

        }
        if (phone !== undefined) {
            user.phone = phone;
        }
        if (email !== undefined) {
            user.email = email;
        }


        const updateduser = await this.userRepo.save(user);
        return { name: updateduser.name, email: updateduser.email };
    }
    async findById(id: string) {
        const user = await this.userRepo.findOne({ where: { id }, select: ['id', 'name', 'email', 'phone'], });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}