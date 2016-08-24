(function() {
'use strict';

    angular
        .module('BingoApp')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$q', '$timeout', '$http'];
    function AuthService($q, $timeout, $http) {
        var user = null
        var service = {
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            login: login,
            logout: logout,
            register: register
        };
        
        return service;

        function isLoggedIn() {
            if(user) {
                return true;
            } else {
                return false;
            }
        }

        function getUserStatus() {
            return user;
        }

        function login(user) {
            var deferred = $q.defer();
            $http.post('/auth/login', user)
                .success(function (data, status) {
                    if(status === 200 && data.status){
                        user = true;
                        deferred.resolve();
                    } else {
                        user = false;
                        deferred.reject();
                    }
                })
                .error(function (data) {
                    user = false;
                    deferred.reject();
                });
                return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            $http.get('/auth/logout')
                .success(function (data) {
                    user = false;
                    deferred.resolve();
                })
                .error(function (data) {
                    user = false;
                    deferred.reject();
                });
            return deferred.promise;
        }

        function register(user) {
            var deferred = $q.defer();
            $http.post('/auth/register', user)
                .success(function (data, status) {
                    if(status === 200 && data.status){
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                }).error(function (data) {
                    deferred.reject();
                });
            return deferred.promise;

        }

    }
})();