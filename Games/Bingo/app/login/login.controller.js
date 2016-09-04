(function() {
'use strict';

    angular
        .module('BingoApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', '$stateParams', '$state', '$window'];
    function LoginController(AuthService, $stateParams, $state, $window) {
        var vm = this;
        vm.user = {};
        vm.login = function() {
            AuthService.login(vm.user)
                .then(function(response){
                    console.log(angular.toJson($stateParams.toState));
                    if(typeof $stateParams.toState !== 'undefined') {
                        $state.go($stateParams.toState);
                    } else {
                        $state.go('bingo.dashboard');
                    }
                }, function(response){
                        console.log(angular.toJson(response));
                });
        }

        vm.externalAuthProvider = (provider) => {
             if(provider === 'facebook'){
                 $window.location.href = "/auth/facebook";
             }
        }
    }
})();