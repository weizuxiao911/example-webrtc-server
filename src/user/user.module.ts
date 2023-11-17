import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaseEnity, User } from './user.entities'
import config from 'src/config'

@Module({
  imports: [
    // TypeOrmModule.forFeature([User]),
    // TypeOrmModule.forRootAsync({
    //   useFactory: async () => {
    //     const db = await config.get('mysql')
    //     console.log('db ->', db)
    //     return db
    //   }
    // }),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
