'use strict';
angular.module('directives.historyItem', [])
.directive('historyItem', function() {
  return {
    restrict: 'E',
    scope: {
      history: '='
    },
    controller: 'MainCtrl',
    templateUrl: "views/directives/historyItem.html",
  };
});
