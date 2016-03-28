'use strict';

/**
* @ngdoc function
* @name weatherAppApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the weatherAppApp
*/

angular.module('weatherAppApp')
.controller('MainCtrl', ['$scope', '$location', 'localStorageService', '$http', function ($scope, $location, localStorageService, $http) {
  $scope.city = '';
  $scope.error = {};
  $scope.loading = false;


  var historyStore = localStorageService.get('history');
    $scope.historyList = historyStore || [];
    $scope.$watch('historyList', function () {
      localStorageService.set('history', $scope.historyList);
    }, true);


    // check if the user has searched that city before
    function checkCity(city) {
      var found = $scope.historyList.some(function (el) {
        //if yes, just update the counter and date
        if (el.city.toLowerCase() === city.toLowerCase()) {
          el.counter += 1;
          el.date = new Date();
          console.log(el);
        }
        return el.city.toLowerCase() === city.toLowerCase();
      });
      // if not, add the city to history
      if (!found) {
        $scope.historyList.push({
          city: $scope.weather.city.name,
          date: new Date(),
          counter: 1
        });
      }
    }

  // get weather from search input
  $scope.updateLocation = function() {
    if($scope.city !== '') {
      $scope.loading = true;
      $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID=8615380fe529fe5f66942fed8cd1c327&type=accurate&q='+$scope.city+'&units=metric',
        params: {
            format: 'jsonp',
            json_callback: 'JSON_CALLBACK'
        }
      }
    ).then(function(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.weather = response.data;
      //add to history
      checkCity($scope.weather.city.name);

      $scope.loading = false;
      $scope.hasSearched = true;
      $scope.city = '';
      $scope.error.show = false;

    }).catch(function(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response.status, response.data);
      $scope.error = {
        message: 'Something went wrong, please try again',
        show: true
      };
      $scope.city = '';
    });
  } else {
    $scope.error = {
      message: 'You need to enter a city',
      show: true
    };
  }
};

$scope.searchFromHistory = function(city) {
  $scope.city = city;

    $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID=8615380fe529fe5f66942fed8cd1c327&type=accurate&q='+city+'&units=metric',
      params: {
          format: 'jsonp',
          json_callback: 'JSON_CALLBACK'
      }
    }
  ).then(function(response) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.weather = response.data;
    console.log($scope.weather);
    console.log($scope.historyList);
    $scope.loading = false;
    $scope.hasSearched = true;
    $scope.error.show = false;

  }).catch(function (response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(response.status, response.data);
    $scope.error = {
      message: 'Something went wrong, please try again',
      show: true
    };
  });
};

}]);
