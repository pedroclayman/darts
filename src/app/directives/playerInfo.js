'use strict';

angular.module('darts').directive('playerInfo', [
  'game',
  function playerInfo(game) {
    return {
      restrict: 'A',
      template:   '<div class="player-standings" ng-class="{\'active\' : isActive() }">' +
                  '<div class="img-wrapper"><img gravatar-src="player.email()" gravatar-size="150"></div>' +
                  '<span class="name">{{getNameWithFallback()}}</span>' +
                  '<span class="score">{{player.score()}}</span>' +
                  '<input score-input="player" type="text" name="move" is-active="isActive()">' +
                  '<div class="moves">' +
                  '<div move-info="move" ng-repeat="move in player.getMoves() track by $index"></div>' +
                  '</div>' +
                  '</div>',
      scope: {
        player: '=playerInfo',
        activePlayers: "="
      },
      link: function(scope, element, attrs) {
        scope.isActive = function() {
          return game.isOnTurn(scope.player, scope.activePlayers);
        };

        scope.getNameWithFallback = function() {
          var name = scope.player.name();
          return name != null && name !== '' ? scope.player.name() : "???";
        };
      }
    };
  }
]);
