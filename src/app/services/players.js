'use strict';

var Player = function(name, email) {
  var moves = [];
  var score;


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

  this.score = function(newScore) {
    if (angular.isDefined(newScore)) {
      score = newScore;
    }
    return score;
  };

  this.undoLastMove = function() {
    if (moves.length > 0) {
      var lastMove = parseInt(moves.pop());
      score += lastMove;
    }
  };

  this.resetScore = function(resetTo) {
    score = resetTo;
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

  this.isPlaying = function() {
    return score != null;
  };

  this.getMoves = function() {
    return moves;
  };
};

angular.module('darts').factory('players', [
  'playerStore',
  function players(playerStore) {

    var api = {
      createPlayer: function(name, email) {
        var player = new Player(name, email);
        return player;
      },
      addPlayer: function(player) {
        players.push(player);
        playerStore.store(players);
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

    var players = playerStore.retrieve();

    return api;
  }
]);
