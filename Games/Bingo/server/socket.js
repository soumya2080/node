module.exports = function (io) {
  'use strict';
  
  io.sockets.on('connection', function(socket){
        
        socket.on('sendUserId', function(data){
            //Emits to every one
            io.sockets.emit('newUser', data);
            //Emits to every one except sender
            //socket.broadcast.emit('new message', data);
        })
    });

};