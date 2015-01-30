'use strict';

angular.module('darts').directive('availablePlayer', [

  function availablePlayer() {
    return {
      restrict: 'A',
      template: '<div><img gravatar-src="player.email()" gravatar-size="50"><span>{{player.name()}}</span></div>'
    }
  }
]);
