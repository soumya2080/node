(function() {
'use strict';

    angular
        .module('BingoApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', '$stateParams', '$state'];
    function LoginController(AuthService, $stateParams, $state) {
        var vm = this;
        vm.user = {};
        vm.login = function() {
            AuthService.login(vm.user)
                .then(function(response){
                    console.log(angular.toJson($stateParams));
                    if($stateParams.toState) {
                        $state.go($stateParams.toState);
                    } else {
                        $state.go('bingo.dashboard');
                    }
                }, function(response){
                        console.log(angular.toJson(response));
                });
        }

    }
})();