import { Injectable } from '@nestjs/common'
import { User } from './user.entities'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {

    // constructor(
    //     @InjectRepository(User)
    //     private userRepository: Repository<User>
    // ) { }

    async findAll(): Promise<User[]> {
        // return await this.userRepository.find()
        return null
    }
    
}
