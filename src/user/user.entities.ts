import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export class BaseEnity {
    @PrimaryGeneratedColumn()  
    id: number

    @Column({name: 'create_time'})
    createTime: Date

    @Column({name: 'modify_time'})
    modifyTime: Date

    @Column({name: 'deleted'})
    deleted: boolean

    @Column({name: 'version'})
    version: number

}

@Entity({name: 't_user'})
export class User extends BaseEnity {

    @Column({name: 'user_id'})
    userId: string

    @Column({name: 'username'})
    username: string

    @Column({name: 'password'})
    password: string

}