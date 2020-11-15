//first we need to listen the socket,creating instance of  socket.io.js
'use strict';
var socket = io();
let vm= new Vue({
    el:'#chat',
    data:{
        messages:[],
        newMessage:''

    },
    created:function(){

        socket.on('chat-AllPervious',function(data){
            this.messages=data.messages;

        }.bind(this));

    },
    method:{
        addMessage:function(){
            socket.on('chat-addMessage',{message:this.newMessage});
        }

    }
});