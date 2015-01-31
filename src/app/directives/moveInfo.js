'use strict';

angular.module('darts').directive('moveInfo', [
  function moveInfo() {
    return {
      restrict : 'A',
      replace: true,
      template: '<span class="move-info">{{move}}</span>',
      scope: {
        move: "=moveInfo"
      }
    };
  }
]);
