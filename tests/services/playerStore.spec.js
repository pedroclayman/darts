'use strict';

describe('playerStore', function() {
  var playerStore;

  var setSpy = jasmine.createSpy('set');
  var getSpy = jasmine.createSpy('get');

  beforeEach(function() {
    module('darts');
    module(function($provide) {
      $provide.factory('localStorageService', function() {
        return {
          set: function() {
            setSpy(arguments);
          },
          get: function() {
            getSpy(arguments);
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
});
