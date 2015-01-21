'use strict';

angular.module('darts').controller('settings', [
 '$scope',
  function($scope) {
    $scope.gameTypes = [101, 201, 301, 501];

    $scope.model = {

      players: [],
      gameType: 301
    };

    $scope.addNewPlayer = function() {
      $scope.model.players.push({ score: $scope.model.gameType, moves: [] });
    };

    $scope.removePlayer = function(idxPlayer) {
      $scope.model.players.splice(idxPlayer, 1);
    }
  }
])
