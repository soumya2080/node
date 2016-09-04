(function() {
'use strict';

    angular
        .module('BingoApp')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$q', '$http', '$rootScope'];
    function AuthService($q, $http, $rootScope) {
        $rootScope.user = null
        var service = {
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            login: login,
            logout: logout,
            register: register,
            callAuthProvider: callAuthProvider
        };
        
        return service;

        function isLoggedIn() {
            if($rootScope.user) {
                return true;
            } else {
                return false;
            }
        }

        function getUserStatus() {
            return $rootScope.user;
        }

        function login(user) {
            var deferred = $q.defer();
            $http.post('/auth/login', user)
                .success(function (data, status) {
                   
                    if(status === 200 && data.status){
                        $rootScope.user = true;
                        deferred.resolve();
                    } else {
                        $rootScope.user = false;
                        deferred.reject();
                    }                    
                })
                .error(function (data) {
                    $rootScope.user = false;
                    deferred.reject();
                });
                return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            $http.get('/auth/logout')
                .success(function (data) {
                    $rootScope.user = false;
                    deferred.resolve();
                })
                .error(function (data) {
                    $rootScope.user = false;
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

        function callAuthProvider(provider) {
            if(provider === 'facebook') {
                var deferred = $q.defer();
                $http.post('/auth/facebook')
                    .success(function (data, status) { 
                    })
                    .error(function (data) {
                    });
                    return deferred.promise;
            }
        }

    }
})();