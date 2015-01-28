'use strict';

angular.module('darts').directive('selectLock', [

  function() {
    return {
      restrict: 'A',
      replace: true,
      template: '<div><span>Choose your type of game:</span><span ng-if="lockCondition === true">{{model[propName]}}</span><select ng-if="lockCondition !== true" ng-model="model[propName]" ng-options="sl for sl in dt"></select></div>',
      scope: {
        dt: '=',
        lockCondition: '=',
        model: "=",
        propName: "@"
      }
    };
  }
]);
