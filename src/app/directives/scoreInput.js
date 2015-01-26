'use strict';

angular.module('darts').directive('scoreInput',[
  'game', 'toaster',
  function(game, toaster) {
    return {
      restrict: 'A',
      scope: {
        player: '='
      },
      link: function(scope, element, attrs) {
        var isWholeNumber = function(n) {
          return n != null && n !== '' && n % 1 === 0;
        }

        element.on('keyup', function(e) {
          if (e.keyCode === 13) {
            var amount = element.val();

            if (isWholeNumber(amount)) {
              var score = scope.player.score;

              var isGameOver = game.makeMove(amount, scope.player);

              if (isGameOver) {
                toaster.pop('success', 'Game Over', scope.player.name + ' won !');
              }

              if (!scope.$$phase)
                scope.$apply();
            }
            element.val(null);
          }
        });
      }
    }
  }
])
