'use strict';

angular.module('darts').factory('playerStore', [
  'localStorageService',
  function(localStorageService) {

    var storeKey = "players";

    return {
      store: function(name, email) {
        localStorageService.set(storeKey, { name: name, email: email });
      },
      retrieve: function() {
        return localStorageService.get(storeKey);
      }
    };
  }
]);
