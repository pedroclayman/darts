'use strict';

describe('game', function() {
  var game;

  beforeEach(function() {
    module('darts');
  });

  beforeEach(function() {
    inject([
      'game',
      function(gameInj) {
        game = gameInj;
      }
    ]);
  });

  it('should expose a method "makeMove"', function() {
    expect(game.makeMove).toBeDefined();
  });
});
