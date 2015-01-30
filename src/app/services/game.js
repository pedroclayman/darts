'use strict';

angular.module('darts').factory('game', [
  'players',
  function(players) {

    return {
      isGameOver: function() {
        var allPlayers = players.getPlayers();
        for (var i = 0; i < allPlayers.length; i++) {
          var player = allPlayers[i];
          if (player.getScore() === 0) {
            return true;
          }
        }
        
        return false;
      }
    };
  }
])
