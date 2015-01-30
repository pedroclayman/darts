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
            setSpy(arguments);
          },
          get: function(key) {
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

  it('should expose a method "store" that preprocesses and saves players using local storage and a retrieve method', function() {
    expect(angular.isFunction(playerStore.store)).toBeTruthy();

    var players = [];
    var player = new Player('Peto', 301, 'peter@somewhere.com');
    players.push(player);

    playerStore.store(players);

    expect(setSpy).toHaveBeenCalled();
    var retrievedPlayers = playerStore.retrieve();

    expect(retrievedPlayers.length).toEqual(1);
    expect(retrievedPlayers[0]).toEqual({name: 'Peto', email: "peter@somewhere.com" })
  });

  it('should return an empty array when calling "retrieve" and no data is stored in local storage', function() {
    var players = playerStore.retrieve();
    expect(players.length).toEqual(0);
  });
});
