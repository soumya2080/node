(function() {
    'use strict';

    angular
        .module('BingoApp')
        .config(LazyLoadConfig);

    LazyLoadConfig.$inject = ['$ocLazyLoadProvider'];

    function LazyLoadConfig($ocLazyLoadProvider) {

        //login module
        $ocLazyLoadProvider.config({
            modules: [{
                name: 'LoginModule',
                files: ['/login/login.controller.js']
            }, {
                name: 'SignupModule',
                files: ['/signup/signup.controller.js']
            }, {
                name: 'MainModule',
                files: ['/main/main.controller.js']
            }, {
                name: 'DashboardModule',
                files: ['/dashboard/dashboard.controller.js']
            }]
        });

    }
})();