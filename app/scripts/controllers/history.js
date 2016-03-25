'use strict';

/**
 * @ngdoc function
 * @name weatherAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weatherAppApp
 */
angular.module('weatherAppApp').factory('getHistory', ['$http', function($http) {
    return $http.get("http://localhost:9000/data/history.json");
}]);

angular.module('weatherAppApp')
  .controller('HistoryCtrl', ['$scope', 'getHistory', function ($scope, getHistory) {
    $scope.history = null;
    getHistory.success(function(data) {
      $scope.history = data;
      console.log(data);
    }).error(function(data) {
      console.log(data);
    });
  }]);
