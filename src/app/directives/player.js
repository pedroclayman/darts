'use strict';

angular.module('darts').directive('playerInfo', [

  function playerInfo() {
    return {
      restrict: 'A',
      template: '<div class="player-standings">' +
                  '<span class="name">{{getName()}}</span>' +
                  '<span class="score">{{player.score}}</span>' +
                  '<input score-input player="player" type="text" name="move">' +
                  '</div>',
      scope: {
        player: '=playerInfo'
      },
      link: function(scope, element, attrs) {
        scope.getName = function() {
          return scope.player.name != null ? scope.player.name : "???";
        };
      }
    };
  }
]);
