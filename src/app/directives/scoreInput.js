'use strict';

angular.module('darts').directive('scoreInput',[
  'game',
  function(game) {
    return {
      restrict: 'A',
      scope: {
        player: '='
      },
      link: function(scope, element, attrs) {
        var isWholeNumber = function(n) {
          return n % 1 === 0;
        }

        element.on('keyup', function(e) {
          if (e.keyCode === 13) {
            var amount = element.val();

            if (isWholeNumber(amount)) {
              var score = scope.player.score;

              game.makeMove(amount, scope.player);
              
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
