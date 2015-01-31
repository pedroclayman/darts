'use strict';

angular.module('darts').filter('isPlaying', [

  function isPlayingFilter() {
    return function(players) {
      return players.filter(function(player) {
        return player.isPlaying();
      });
    }
  }
]);
