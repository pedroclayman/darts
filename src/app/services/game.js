'use strict';

angular.module('darts').factory('game', [
  'players',
  function(players) {

    return {
      isGameOver: function() {
        var allPlayers = players.getPlayers();
        for (var i = 0; i < allPlayers.length; i++) {
          var player = allPlayers[i];
          if (player.score() === 0) {
            return true;
          }
        }

        return false;
      },
      isOnTurn: function(player) {
        var allPlayers = players.getPlayers();

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
