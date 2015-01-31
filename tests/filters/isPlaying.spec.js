'use strict';

describe('isPlaying filter', function() {
  var isPlayingFilter;

  beforeEach(function() {
    module('darts');
  });

  beforeEach(function() {
    inject([
      'isPlayingFilter',
      function(isPlayingFilterInj) {
        isPlayingFilter = isPlayingFilterInj;
      }
    ]);
  });

  it('should return only players that are playing', function() {
    var players = [];
    var person = new Player('Peter');
    person.score(301);
    expect(person.isPlaying()).toBeTruthy();
    players.push(person);

    person = new Player('Mike');
    expect(person.isPlaying()).toBeFalsy();
    players.push(person);

    var filteredPlayers = isPlayingFilter(players);
    expect(filteredPlayers.length).toEqual(1);
    expect(filteredPlayers[0].name()).toEqual('Peter');
  });
});
