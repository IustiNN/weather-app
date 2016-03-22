'use strict';

/**
* @ngdoc function
* @name weatherAppApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the weatherAppApp
*/
angular.module('weatherAppApp')
.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.city = '';

  $scope.getBrowserLocation = function(){
    navigator.geolocation.getCurrentPosition(function(position){

      var lat = position.coords.latitude;
      var lon = position.coords.longitude;


      $http.jsonp("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+lat+"&lon="+lon+"&APPID=8615380fe529fe5f66942fed8cd1c327&callback=angular.callbacks._0&cnt=1&units=metric").
      success(function(response){
        $scope.weather = response;
        console.log(response);
      }).
      error(function(){
        alert('error');
      });
      
    });
  };

  $scope.getBrowserLocation();

  $scope.updateLocation = function() {
    if($scope.city !== '') {
      $http.jsonp( 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID=8615380fe529fe5f66942fed8cd1c327&callback=angular.callbacks._0&cnt=1&q='+$scope.city+'&units=metric'
    ).success(function(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response);
      $scope.weather = response;
    }).error(function(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
    });
  } else {
    $scope.getBrowserLocation();
  }
};

}]);
