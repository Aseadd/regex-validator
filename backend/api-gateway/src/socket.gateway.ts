// socket-gateway.ts
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Redis } from 'ioredis';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:61234',
    credentials: true,
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private redis!: Redis;

  afterInit(server: Server) {
    // Redis publisher (you can use this later if needed)
    this.redis = new Redis({ host: process.env.REDIS_HOST || 'redis' });

    // Redis subscriber
    const sub = new Redis({ host: process.env.REDIS_HOST || 'redis' });

    sub.psubscribe('job:update:*', (err, count) => {
      if (err) {
        console.error('Redis psubscribe error:', err);
      } else {
        console.log(`Subscribed to ${count} Redis channel(s) for job updates`);
      }
    });

    sub.on('pmessage', (pattern, channel, message) => {
      const update: { jobId: string; [key: string]: any } = JSON.parse(message);
      console.log(`Received Redis update: ${message}`);

      // Emit to frontend — socket.io channel per job ID
      server.emit(`job:update:${update.jobId}`, update);
    });
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
