'use strict';

angular.module('darts').factory('game', [
  function() {

    return {
      makeMove: function(amount, player) {
        player.moves.push(amount);

        if (amount <= player.score)
          player.score = player.score - amount;

        if(player.score == 0)
          alert('game over');
      }
    }
  }
])
