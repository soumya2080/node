(function() {
    'use strict';

    angular
        .module("BingoApp", [
            'ngMaterial',
            'ngMdIcons',
            'ui.router',
            'oc.lazyLoad',
            'AngularSocket'
        ])
        .run(function($rootScope, $state, AuthService) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
                //console.log("fromState: "+angular.toJson(fromState)+", toSate:"+angular.toJson(toState));
                if (toState.name !== 'login' && toState.name !== 'signup') {
                    event.preventDefault();
                    if (AuthService.isLoggedIn() === false) {
                        $state.go('login', {
                            toState: toState
                        });
                    }
                }

            });
        });

})()