'use strict';

describe('players', function() {
  var players;

  beforeEach(function() {
    module('darts');
  });

  beforeEach(function() {
    inject([
        'players',
        function(playersInj) {
          players = playersInj;
        }
      ]);
  });

  it('should expose a method "createPlayer"', function() {
    expect(players.createPlayer).toBeDefined();
    expect(angular.isFunction(players.createPlayer)).toBeTruthy();
  });

  it('should create a player', function() {
    var player = players.createPlayer('Peter', 301);
    expect(player.name).toEqual("Peter");
    expect(player.score).toEqual(301);
    expect(player.moves).toEqual([]);
  });
});
