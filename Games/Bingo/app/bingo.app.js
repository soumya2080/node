(function(){
    'use strict';

    angular
        .module("BingoApp", [
            'ngMaterial',
            'ui.router',
            'oc.lazyLoad',
            'AngularSocket'
        ])
        .run(function($rootScope, $state) {
            $rootScope.$on('$stateChangeStart', function(e, to) {
                /*if (result && result.to) {
                    e.preventDefault();
                    // Optionally set option.notify to false if you don't want 
                    // to retrigger another $stateChangeStart event
                    $state.go(result.to, result.params, {notify: false});
                }*/
            });
        });      

})()