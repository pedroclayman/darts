'use strict';

describe('game', function() {
  var game, players;

  beforeEach(function() {
    module('darts');

    module(
      function($provide) {
        $provide.factory('players', function() {

          var scoreFct = function() {
            if (this._score != null)
              return this._score;
            return null;
          };

          var movesFct = function() {
            if (this._moves != null)
              return this._moves;
            return null;
          };

          var players = [];

          return {
            getPlayers: function() {
              angular.forEach(players, function(player) {
                player.score = scoreFct;
                player.getMoves = movesFct;
              });

              return players;
            },
            setPlayers: function(_players) {
              players = _players;
            }
          };
        });

    });
  });

  beforeEach(function() {

    inject([
      'game', 'players',
      function(gameInj, playersInj) {
        game = gameInj;
        players = playersInj;
      }
    ]);
  });

  it('should expose method "isGameOver"', function() {
    expect(angular.isFunction(game.isGameOver)).toBeTruthy();
  });

  it('should return false if none of the score is 0', function() {
    var allPlayers = [
      { name: 'John', _score: 101, _moves: [] },
      { name: 'Mike', _score: 201, _moves: [] }
    ];
    players.setPlayers(allPlayers);

    expect(game.isGameOver(players.getPlayers())).toBeFalsy();
  });

  it('should return true if one of the score is 0', function() {
    var allPlayers = [
      { name: 'John', _score: 101, _moves: [] },
      { name: 'Mike', _score: 0, _moves: [] }
    ];
    players.setPlayers(allPlayers);

    expect(game.isGameOver(players.getPlayers())).toBeTruthy();
  });

  it('should expose method "isOnTurn"', function() {
    expect(angular.isFunction(game.isOnTurn)).toBeTruthy();
  });

  it('"isOnTurn" should return the first player that has the least moves so far', function() {
    var allPlayers = [
      { name: 'John', _score: 101, _moves: [12, 13, 15] },
      { name: 'Mike', _score: 1, _moves: [1, 3] },
      { name: 'Mike', _score: 0, _moves: [10, 3, 60] }
    ];
    players.setPlayers(allPlayers);

    allPlayers = players.getPlayers();

    expect(allPlayers.length).toEqual(3);
    expect(game.isOnTurn(allPlayers[0], allPlayers)).toBeFalsy();
    expect(game.isOnTurn(allPlayers[1], allPlayers)).toBeTruthy();
    expect(game.isOnTurn(allPlayers[2], allPlayers)).toBeFalsy();

    allPlayers = [
      { name: 'John', _score: 101, _moves: [12] },
      { name: 'Mike', _score: 1, _moves: [1] },
      { name: 'Mike', _score: 0, _moves: [10] }
    ];
    players.setPlayers(allPlayers);

    allPlayers = players.getPlayers();

    expect(allPlayers.length).toEqual(3);
    expect(game.isOnTurn(allPlayers[0], allPlayers)).toBeTruthy();
    expect(game.isOnTurn(allPlayers[1], allPlayers)).toBeFalsy();
    expect(game.isOnTurn(allPlayers[2], allPlayers)).toBeFalsy();
  });
});
