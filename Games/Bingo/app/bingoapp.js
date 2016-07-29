(function(){
    'use strict';

    angular
        .module("BingoApp", [])
        .factory("socket", socket)
        .controller("BingoController", BingoController)

    BingoController.$inject = ["socket", "$log"];

    function BingoController(socket, $log){
        var vm = this;

        vm.saveUser = saveUser;

        function saveUser(){
            socket.emit('sendUserId', vm.userId);
        }

        socket.on('newUser', function(data){
            vm.users = data;
        });
    }

    socket.$inject = ["$rootScope"];
    function socket($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {  
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }

})()