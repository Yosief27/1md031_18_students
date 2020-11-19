//first we need to listen the socket,creating instance of  socket.io.js


'use strict';
var socket = io();
let vm= new Vue(
    {
        el:'#chatid',
        data:{
            messages:{},
            newMessage:''
            

        },
        methods:{
            addMessage:function(){
                socket.emit('chat-addMessage',{message:this.newMessage});
            }

        },
        created:function(){     

            socket.on('chat-AllPervious',function(data){
                this.messages=data.messages;

            }.bind(this));

        }
      
    }
);