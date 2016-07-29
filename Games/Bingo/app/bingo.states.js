(function() {
'use strict';

    angular
        .module('BingoApp')
        .config(StateConfig);

    StateConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function StateConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                resolve: {
                    loadLoginModule: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('LoginModule');
                    }]
                }
            });
        
        $urlRouterProvider.otherwise(DefaultRoute);
        DefaultRoute.$inject = ['$injector', '$location'];
        function DefaultRoute($injector, $location){
            var $state = $injector.get('$state');
            $state.go('login');
        }

    }
})();