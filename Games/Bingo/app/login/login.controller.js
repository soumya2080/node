(function() {
'use strict';

    angular
        .module('BingoApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = [];
    function LoginController() {
        var vm = this;
        vm.user = {};
    }
})();