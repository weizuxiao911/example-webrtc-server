import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

// socket.broadcast.to(room)
// socket.to(user)
// const clients: any = client.broadcast.to(room ?? 'test')['adapter']['nsp']['sockets'] || new Map<String, Socket>()
// const others = [...clients.values()].filter((it: Socket) => it.id !== client.id)
// console.log(others)

@WebSocketGateway({ cors: true })
export class AppGateway {

  @WebSocketServer() private server: Server

  @SubscribeMessage('join')
  async join(client: Socket, playload: any): Promise<any> {
    client.broadcast.emit('join', playload)
  }

  /**
   * 拨号
   * @param client 
   * @param playload 
   */
  @SubscribeMessage('offer')
  async offer(client: Socket, playload: any): Promise<any> {
    client.broadcast.emit('offer', playload)
  }

  /**
   * 候选
   * @param client 
   * @param playload 
   */
  @SubscribeMessage('candidate')
  async candidate(client: Socket, playload: any): Promise<any> {
    client.broadcast.emit('candidate', playload)
  }

  /**
   * 应答
   * @param client 
   * @param playload 
   */
  @SubscribeMessage('answer')
  async answer(client: Socket, playload: any): Promise<any> {
    client.broadcast.emit('answer', playload)
  }

}
