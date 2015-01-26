'use strict';

angular.module('darts').factory('game', [
  function() {

    return {
      makeMove: function(amount, player) {
        player.moves.push(amount);

        if (amount <= player.score)
          player.score = player.score - amount;

        return player.score == 0;
      }
    }
  }
])
