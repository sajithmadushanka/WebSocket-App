import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

import { Server } from "socket.io";
@WebSocketGateway()
export class MyGeteWay implements OnModuleInit{
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('connected');
        });
    }

    @WebSocketServer()
    server:Server

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body:any){
        console.log(body);
        this.server.emit('onMassage',{
            msg:'New Messsage',
            content:body
        });
    }   
}