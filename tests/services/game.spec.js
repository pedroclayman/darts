'use strict';

describe('game', function() {
  var game;

  beforeEach(function() {
    module('darts');
  });

  beforeEach(function() {
    console.log(inject);
    inject([
      'game',
      function(gameInj) {
        console.log('injector');
        game = gameInj;
      }
    ]);
  });

  it('should expose method "isGameOver"', function() {
    expect(angular.isFunction(game.isGameOver)).toBeTruthy();
  });

});
