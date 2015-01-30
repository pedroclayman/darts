'use strict';

var Player = function(name, score) {
  var originalScore = score;
  var email;
  var moves = [];

  this.name = function(newName) {
    if (angular.isDefined(newName)) {
      name = newName;
    }
    return name;
  };
  this.name(name);

  this.email = function(newEmail) {
    if (angular.isDefined(newEmail)) {
      email = newEmail;
    }
    return email;
  };

  this.undoLastMove = function() {
    if (moves.length > 0) {
      var lastMove = moves.pop();
      score += lastMove;
    }
  };

  this.resetScore = function(resetTo) {
    score = originalScore;
    moves = [];
  };

  this.makeMove = function(points) {

    var isWholeNumber = function(n) {
      return n != null && n !== '' && n % 1 === 0;
    }

    if (isWholeNumber(points) && points >= 0) {
      moves.push(points);

      if (points <= score) {
        score -= points;
      }
    }
  };

  this.getScore = function() {
    return score;
  };

  this.getMoves = function() {
    return moves;
  };
};

angular.module('darts').factory('players', [
  'playerStore',
  function players(playerStore) {
    var players = playerStore.retrieve();

    return {
      createPlayer: function(name, score) {
        var player = new Player(name, score)
        players.push(player);
        return player;
      },
      getPlayers: function() {
        return players;
      },
      getPlayer: function(name) {
        for (var i = 0; i < players.length; i++) {
          var player = players[i];
          if (player.name() === name) {
            return player;
          }
        }
        return null;
      },
      removePlayer: function(name) {
        for (var i = 0; i < players.length; i++) {
          var player = players[i];
          if (player.name() === name) {
            players.splice(i, 1);
            return;
          }
        }

      }
    };
  }
]);
