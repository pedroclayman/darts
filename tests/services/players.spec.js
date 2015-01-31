'use strict';

describe('players', function() {
  var players;
  var spyStore = jasmine.createSpy('store');

  beforeEach(function() {
    module('darts');
    module(function($provide) {
      $provide.factory('playerStore', [
        function() {
          return {
            retrieve: function() {
              return [];
            },
            store: function(players) {
              spyStore(players);
            }
          }
        }
      ]);
    });
  });

  beforeEach(function() {
    inject([
        'players',
        function(playersInj) {
          players = playersInj;
        }
      ]);
  });

  it('a player instance should expose a method "email"', function() {
    var player = players.createPlayer('Peter');
    expect(player.email).toBeDefined();
    expect(angular.isFunction(player.email)).toBeTruthy();
  });

  it('a player instance should expose a method "isPlaying"', function() {
    var player = players.createPlayer('Peter');
    expect(angular.isFunction(player.isPlaying)).toBeTruthy();

    expect(player.isPlaying()).toBeFalsy();
    player.score(301);
    expect(player.isPlaying()).toBeTruthy();
  });

  it('should create a player', function() {
    var player = players.createPlayer('Peter');
    player.score(301);
    expect(player.name()).toEqual("Peter");
    expect(player.score()).toEqual(301);
    expect(player.getMoves()).toEqual([]);
  });

  it('should add a player and store him using playerStore', function() {
    var player = players.createPlayer('Peter', 301);
    expect(players.getPlayers().length).toEqual(0);

    players.addPlayer(player);

    expect(players.getPlayers().length).toEqual(1);
    expect(spyStore).toHaveBeenCalledWith(players.getPlayers());
  });

  it('should get all players', function() {
    players.addPlayer(players.createPlayer('Peter', 301));
    players.addPlayer(players.createPlayer('Jano', 301));

    expect(players.getPlayers().length).toEqual(2);
  });

  it('should get a player by name', function() {
    var player = players.createPlayer('Peter');
    player.score(301);
    players.addPlayer(player);
    player = players.createPlayer('Jano');
    player.score(301);
    players.addPlayer(player);

    var player = players.getPlayer('Jano');
    expect(player.name()).toEqual('Jano');
    expect(player.score()).toEqual(301);

    player = players.getPlayer('Jozefina');
    expect(player).toBeNull();
  });

  it('should remove a player by name', function() {
    players.addPlayer(players.createPlayer('Peter', 301));
    players.addPlayer(players.createPlayer('Jano', 301));


    expect(players.getPlayers().length).toEqual(2);
    players.removePlayer('Jano');
    expect(players.getPlayers().length).toEqual(1);

    players.removePlayer('Jozefina');
    expect(players.getPlayers().length).toEqual(1);
  });

  it('should make a move', function() {
    var player = players.createPlayer('Peter');
    player.score(301);
    player.makeMove(25);
    expect(player.score()).toEqual(276);
  });

  it('should add the move to the end of the moves collection', function() {
    var player = players.createPlayer('Peter', 301);
    player.makeMove(25);

    var moves = player.getMoves();
    expect(moves[moves.length-1]).toEqual(25);
  });

  it('should only make a move if the move is a non negative number', function() {
    var player = players.createPlayer('Peter');
    player.score(301);
    player.makeMove(25);
    expect(player.score()).toEqual(276);

    var moves = player.getMoves();
    expect(moves.length).toEqual(1);

    player.makeMove(-25);
    expect(player.score()).toEqual(276);

    moves = player.getMoves();
    expect(moves.length).toEqual(1);
    expect(moves[moves.length-1]).toEqual(25);

    player.makeMove('x');
    expect(player.score()).toEqual(276);

    moves = player.getMoves();
    expect(moves.length).toEqual(1);
    expect(moves[moves.length-1]).toEqual(25);


    player.makeMove(1.2);
    expect(player.score()).toEqual(276);

    moves = player.getMoves();
    expect(moves.length).toEqual(1);
    expect(moves[moves.length-1]).toEqual(25);
  });

  it('should make a move with more points than the users score', function() {
    var player = players.createPlayer('Peter');
    player.score(301);
    player.makeMove(302);
    expect(player.score()).toEqual(301);

    var moves = player.getMoves();
    expect(moves[moves.length-1]).toEqual(302);
  });

  it('should reset players score and clear all moves', function() {
    var player = players.createPlayer('Peter');
    player.score(301);
    player.makeMove(100);

    expect(player.score()).toEqual(201);
    expect(player.getMoves().length).toEqual(1);
    player.resetScore(301);

    expect(player.score()).toEqual(301);
    expect(player.getMoves().length).toEqual(0);
  });

  it('should undo last move', function() {
    var player = players.createPlayer('Peter');
    player.score(301);
    player.makeMove(100);

    expect(player.score()).toEqual(201);

    var moves = player.getMoves();
    expect(moves[moves.length-1]).toEqual(100);

    player.undoLastMove();
    expect(player.score()).toEqual(301);

    moves = player.getMoves();
    expect(moves.length).toEqual(0);
  });

});
