'use strict';

angular.module('darts').directive('availablePlayer', [

  function availablePlayer() {
    return {
      restrict: 'A',
      template: '<div ng-class="{\'in-game\' : player.isInGame === true}"><img ng-click="toggleIsInGame()" gravatar-src="player.email()" gravatar-size="50"><span>{{player.name()}}</span></div>',
      link: function(scope, element, attrs) {
        scope.toggleIsInGame = function() {
          scope.player.isInGame = !scope.player.isInGame;
        };
      }
    }
  }
]);
