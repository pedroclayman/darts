'use strict';

angular.module('darts').factory('game', [
  function() {

    return {
      isGameOver: function(players) {

        for (var i = 0; i < players.length; i++) {
          var player = players[i];
          if (player.score() === 0) {
            return true;
          }
        }

        return false;
      },
      isOnTurn: function(player, allPlayers) {
        var leastMovesSoFar = null;
        var indexOfPlayerLeastMoves = null;

        for (var i = 0; i <= allPlayers.length-1; i++) {
          var localPlayer = allPlayers[i];
          var noOfMoves = localPlayer.getMoves().length;

          if (leastMovesSoFar == null || leastMovesSoFar > noOfMoves) {
            leastMovesSoFar = noOfMoves;
            indexOfPlayerLeastMoves = i;
          }
        }

        return player === allPlayers[indexOfPlayerLeastMoves];
      }
    };
  }
])
