'use strict';

angular.module('darts').factory('playerStore', [
  'localStorageService',
  function(localStorageService) {

    var storeKey = "players";

    var processPlayer = function(complexPlayerObj) {
      return {
        name: complexPlayerObj.name(),
        email: complexPlayerObj.email()
      }
    }

    return {
      store: function(players) {
        localStorageService.set(storeKey, players.map(function(complexPlayerObj) {
          return processPlayer(complexPlayerObj);
        }));
      },
      retrieve: function() {
        return localStorageService.get(storeKey) || [];
      }
    };
  }
]);
