'use strict';

angular.module('darts').directive('playerInfo', [

  function playerInfo() {
    return {
      restrict: 'A',
      template:   '<div>' +
                  '<div class="img-wrapper"><img gravatar-src="player.email()" gravatar-size="150"></div>' +
                  '<span class="name">{{getNameWithFallback()}}</span>' +
                  '<span class="score">{{player.score()}}</span>' +
                  '<input score-input="player" type="text" name="move">' +
                  '<div class="moves">' +
                  '<div move-info="move" ng-repeat="move in player.getMoves() track by $index"></div>' +
                  '</div>' +
                  '</div>',
      scope: {
        player: '=playerInfo'
      },
      link: function(scope, element, attrs) {
        scope.getNameWithFallback = function() {
          var name = scope.player.name();
          return name != null && name !== '' ? scope.player.name() : "???";
        };
      }
    };
  }
]);
