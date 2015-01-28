'use strict';

var Player = function(name, score) {
  this.name = name;
  this.score = score;
  this.moves = [];
};

angular.module('darts').factory('players', [

  function players() {
    return {
      createPlayer: function(name, score) {
        return new Player(name, score);
      }
    };
  }
]);
