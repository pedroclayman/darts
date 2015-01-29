'use strict';

angular.module('darts').factory('playerStore', [
  'localStorageService',
  function(localStorageService) {
    return {
      store: function(name, email) {
        localStorageService.set({ name: name, email: email });
      }
    };
  }
]);
