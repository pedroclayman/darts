'use strict';

angular.module('darts').controller('settings', [
 '$scope', 'gameTypes', 'players',
  function($scope, gameTypes, players) {
    $scope.gameTypes = gameTypes;

    $scope.model = {
      players: [],
      gameType: 301
    };

    $scope.addNewPlayer = function() {
      $scope.model.players.push(players.createPlayer(null, $scope.model.gameType));
    };

    $scope.removePlayer = function(idxPlayer) {
      $scope.model.players.splice(idxPlayer, 1);
    }
  }
])
