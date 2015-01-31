'use strict';

angular.module('darts').controller('settings', [
 '$scope', 'gameTypes', 'players', 'isPlayingFilter',
  function($scope, gameTypes, players, isPlayingFilter) {
    $scope.gameTypes = gameTypes;

    $scope.newPlayer = null;

    $scope.model = {
      gameType: 301,
      players: players.getPlayers()
    };

    $scope.createPlayer = function() {
      $scope.newPlayer = players.createPlayer('');
    };

    $scope.cancelPlayerCreation = function() {
      $scope.newPlayer = null;
    };

    $scope.savePlayer = function() {
      players.addPlayer($scope.newPlayer);
      $scope.newPlayer = null;
    };

    $scope.togglePlayerInGame = function(player) {
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
      var activePlayers =

      angular.forEach(isPlayingFilter($scope.model.players), function(player) {
        player.resetScore($scope.model.gameType);
      });
    }
  }
]);
