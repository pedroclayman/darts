'use strict';

describe('playerStore', function() {
  var playerStore;

  var setSpy = jasmine.createSpy('set');
  var getSpy = jasmine.createSpy('get');

  beforeEach(function() {
    module('darts');
    module(function($provide) {
      $provide.factory('localStorageService', function() {
        var players = [];
        return {
          set: function(player) {
            players.push(player);
            setSpy(arguments);
          },
          get: function() {
            getSpy(arguments);
            return players;
          }
        };
      });
    });
  });

  beforeEach(function() {
    inject([
      'playerStore',
      function(playerStoreInj) {
        playerStore = playerStoreInj;
      }
    ]);
  });

  it('should expose a method "store" that saves a player using local storage', function() {
    expect(angular.isFunction(playerStore.store)).toBeTruthy();

    playerStore.store('Peto', 'peter.mihalik@gmail.com');

    expect(setSpy).toHaveBeenCalled();
  });

  it('should expose a method "retrieve" and return players using local storage', function() {
    expect(angular.isFunction(playerStore.retrieve)).toBeTruthy();
    playerStore.store('Peto', 'peter.mihalik@gmail.com');

    var players = playerStore.retrieve();
    expect(getSpy).toHaveBeenCalled();

    expect(players.length).toEqual(1);
  });
});
