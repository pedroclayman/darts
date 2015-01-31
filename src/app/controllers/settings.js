'use strict';

angular.module('darts').controller('settings', [
 '$scope', 'gameTypes', 'players',
  function($scope, gameTypes, players) {
    $scope.gameTypes = gameTypes;

    $scope.newPlayer = null;

    $scope.model = {
      gameType: 301,
      players: players.getPlayers()
    };

    $scope.createPlayer = function() {
      $scope.newPlayer = players.createPlayer('');
    };

    $scope.savePlayer = function() {
      players.addPlayer($scope.newPlayer);
      $scope.newPlayer = null;
    };

    $scope.togglePlayerInGame = function(player) {
      console.log('toggling');
      if (player.isPlaying()) {
        player.resetScore(null);
      }
      else {
        player.resetScore($scope.model.gameType);
      }
    };

    $scope.removePlayer = function(player) {
      players.removePlayer(player.name());
    };

    $scope.resetGame = function() {
      angular.forEach($scope.model.players, function(player) {
        player.resetScore();
      });
    }
  }
]);
