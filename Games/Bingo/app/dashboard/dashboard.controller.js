(function() {
    'use strict';

    angular
        .module('BingoApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = [];

    function DashboardController() {
        var vm = this;
    }
})();