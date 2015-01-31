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
          set: function(key, localPlayers) {
            players = localPlayers;
            setSpy(localPlayers);
          },
          get: function(key) {
            getSpy(players);
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

  it('should expose a method "store" that preprocesses and saves players using local storage and a retrieve method', function() {
    expect(angular.isFunction(playerStore.store)).toBeTruthy();

    var players = [];
    var player = new Player('Peto', 'peter@somewhere.com');
    players.push(player);

    playerStore.store(players);

    expect(setSpy).toHaveBeenCalledWith([{ name: 'Peto', email: 'peter@somewhere.com' }]);
    var retrievedPlayers = playerStore.retrieve();

    expect(retrievedPlayers.length).toEqual(1);

    // a rather stupid test how to determine in its not the simple object
    expect(retrievedPlayers[0]).not.toEqual({ name: 'Peto', email: 'peter@somewhere.com' });
  });

  it('should return an empty array when calling "retrieve" and no data is stored in local storage', function() {
    var players = playerStore.retrieve();
    expect(players.length).toEqual(0);
  });
});
