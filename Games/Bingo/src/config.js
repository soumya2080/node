import angular from 'angular';
import uiRouter from 'angular-ui-router';

const app = angular.module('app', [uiRouter]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('welcome', {
            url: '/',
            template: require('welcome/welcome.html'),
            //controller: welcomeController
        })
        .state('play', {
            url: '/play',
            template: require('play/play.html')
        });

    $locationProvider.html5Mode(true);
});

export default app;