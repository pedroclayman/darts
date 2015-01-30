'use strict';

angular.module('darts').controller('settings', [
 '$scope', 'gameTypes', 'players', 'playerStore',
  function($scope, gameTypes, players, playerStore) {
    $scope.gameTypes = gameTypes;

    $scope.availablePlayers = playerStore.retrieve();

    $scope.model = {
      gameType: 301,
      players: players.getPlayers()
    };

    $scope.addNewPlayer = function() {
      players.createPlayer('', $scope.model.gameType)
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
