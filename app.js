/*jslint node: true */
/* eslint-env node */
'use strict';

// Require express, socket.io, and vue
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
 
// Pick arbitrary port for server
var port = 3000;
app.set('port', (process.env.PORT || port));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public/')));
// Serve vue from node_modules as vue/
app.use('/vue', express.static(path.join(__dirname, '/node_modules/vue/dist/')));
// Serve index.html directly as root page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
// Serve map.html as /map
app.get('/map', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/map.html'));
});
// Serve chat.html as /chat
app.get('/chat', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/chat.html'));
});
// Serve dispatcher.html as /dispatcher
app.get('/dispatcher', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/dispatcher.html'));
});

// Store data in an object to keep the global namespace clean and 
// prepare for multiple instances of data if necessary
function Data() {
  this.orders = {};
  this.messages=[];
}

/*
  Adds an order to to the queue
*/
Data.prototype.addOrder = function (order) {
  //Store the order in an "associative array" with orderId as key
  this.orders[order.orderId] = order;
};
Data.prototype.getAllOrders = function () {
  
  return this.orders;
};
Data.prototype.addMessage = function (message) {  
  this.messages.push(message)
};
Data.prototype.getAllMessages = function () {
  
      return this.messages;
    };

var data = new Data();

io.on('connection', function(socket) {
  // Send list of orders when a client connects
  socket.emit('initialize', { orders: data.getAllOrders() });

  //related to chat
  // Send list of messages when a client connects
  socket.emit('chat-AllPervious', { messages: data.getAllMessages() });

  // When a connected client emits an "addMessage" message
  socket.on('chat-addMessage', function (message) {
    data.addMessage(message);
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit('chat-AllPervious', { messages: data.getAllMessages() });
  });
  // When a connected client emits an "addOrder" message
  socket.on('addOrder', function (order) {
    data.addOrder(order);
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit('currentQueue', { orders: data.getAllOrders() });
  });

});

var server = http.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});