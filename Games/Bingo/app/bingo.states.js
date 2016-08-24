(function() {
    'use strict';

    angular
        .module('BingoApp')
        .config(StateConfig);

    StateConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function StateConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.rule(function($injector, $location) {
            var path = $location.path();
            // check to see if the path already has a slash where it should be
            if (path[path.length - 1] === '/') {
                path = path.substring(0, path.length - 1);
                return path;
            }
        });

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

            })
            .state('signup', {
                url: '/signup',

                templateUrl: '/signup/signup.html',
                controller: 'SignupController',
                controllerAs: 'vm',
                resolve: {
                    loadLoginModule: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('SignupModule');
                    }]
                }

            })
            .state('bingo', {
                url: '/bingo',
                abstract: true,
                templateUrl: '/main/main.html',
                controller: 'MainController',
                controllerAs: 'vm',
                resolve: {
                    loadLoginModule: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('MainModule');
                    }]
                }

            })
            .state('bingo.dashboard', {
                url: '/dashboard',
                templateUrl: '/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                resolve: {
                    loadLoginModule: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('DashboardModule');
                    }]
                }
            });

        $urlRouterProvider.otherwise(DefaultRoute);
        DefaultRoute.$inject = ['$injector', '$location'];

        function DefaultRoute($injector, $location) {
            var $state = $injector.get('$state');
            $state.go('bingo.dashboard');
        }

    }
})();