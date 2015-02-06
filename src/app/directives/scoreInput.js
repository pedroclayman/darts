'use strict';

angular.module('darts').directive('scoreInput',[
  function() {
    return {
      restrict: 'A',
      scope: {
        player: '=scoreInput',
        isActive: "="
      },
      link: function(scope, element, attrs) {

        scope.$watch('isActive',
          function(newVal) {
            if (newVal) {
              element.removeAttr('disabled');
              element[0].focus();
            }
            else {
              element.attr('disabled', 'disabled');
              element[0].blur();
            }
          });

        element.on('keyup', function(e) {
          if (e.keyCode === 13) {
            var amount = element.val();

            if (amount === '-') {
              scope.player.undoLastMove();
            }
            else if (amount != null && amount !== '') {
              scope.player.makeMove(amount);
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
