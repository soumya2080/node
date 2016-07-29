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
                files: ['/login/login.app.js', '/login/login.controller.js']
            }]
        });

    }
})();