'use strict';

angular.module('darts').directive('scoreInput',[
  'game',
  function(game) {
    return {
      restrict: 'A',
      scope: {
        player: '=scoreInput'
      },
      link: function(scope, element, attrs) {

        element.on('keyup', function(e) {
          if (e.keyCode === 13) {
            var amount = element.val();

            if (amount === '-') {
              scope.player.undoLastMove();
            }
            else if (amount != null && amount !== '') {
              scope.player.makeMove(amount);

              if(game.isGameOver()) {
                alert('Game Over\n' + scope.player.name() + ' won !');
              }
            }

            if (!scope.$$phase)
              scope.$apply();

            element.val(null);
          }
        });
      }
    }
  }
])
