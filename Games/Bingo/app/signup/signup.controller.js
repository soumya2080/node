(function() {
'use strict';

    angular
        .module('BingoApp')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['AuthService'];
    function SignupController(AuthService) {
        var vm = this;
        vm.user = { };
        vm.signUp = function() {
            AuthService.register(vm.user)
                .then(function(response){
                    console.log(response.data.status);
                }, function(response){
                    console.log(angular.toJson(response.err));
                });
        }
    }
})();