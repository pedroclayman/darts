'use strict';

angular.module('darts').directive('availablePlayer', [

  function availablePlayer() {
    return {
      restrict: 'A',
      template: '<div ng-class="{\'in-game\' : player.isPlaying() === true}"><img ng-click="itemClicked()" gravatar-src="player.email()" gravatar-size="50"><span>{{player.name()}}</span></div>',
      scope: true,
      link: function(scope, element, attrs) {
        scope.itemClicked = function() {
          scope.togglePlayerInGame(scope.player);
        };
      }
    }
  }
]);
