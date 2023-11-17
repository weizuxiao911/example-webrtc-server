import { Controller, Param, Post } from '@nestjs/common'
import { User } from './user.entities'
import { UserService } from './user.service'

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Post(':username')
    async detail(@Param("username") username: string): Promise<User[]> {
        return await this.userService.findAll()
    }

}
