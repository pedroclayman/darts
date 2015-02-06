'use strict';

angular.module('darts').controller('game', [
 '$scope', 'gameTypes', 'players', 'isPlayingFilter', 'game',
  function($scope, gameTypes, players, isPlayingFilter, game) {
    $scope.gameTypes = gameTypes;

    $scope.newPlayer = null;

    $scope.activePlayers = [];

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

        var idx = $scope.activePlayers.indexOf(player);
        if (idx > -1) {
          $scope.activePlayers.splice(idx, 1);
        }
      }
      else {
        player.resetScore($scope.model.gameType);
        $scope.activePlayers.push(player);
      }
    };

    $scope.isPlayerActive = function(player) {
      var isa = game.isOnTurn(player);
      console.log(player.name() + ' ' + isa);
      return isa;
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
