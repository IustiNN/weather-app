'use strict';

/**
 * @ngdoc function
 * @name weatherAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weatherAppApp
 */

angular.module('weatherAppApp')
  .controller('HistoryCtrl', ['$scope', 'localStorageService', function ($scope, localStorageService) {
    var historyStore = localStorageService.get('history');
      $scope.historyList = historyStore || [];

      
  }]);
