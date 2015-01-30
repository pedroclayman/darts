'use strict';

describe('players', function() {
  var players;

  beforeEach(function() {
    module('darts');
  });

  beforeEach(function() {
    inject([
        'players',
        function(playersInj) {
          players = playersInj;
        }
      ]);
  });

  describe('', function() {
    it('should expose a method "createPlayer"', function() {
      expect(players.createPlayer).toBeDefined();
      expect(angular.isFunction(players.createPlayer)).toBeTruthy();
    });

    it('should expose a method "getPlayers"', function() {
      expect(players.getPlayers).toBeDefined();
      expect(angular.isFunction(players.getPlayers)).toBeTruthy();
    });

    it('should expose a method "removePlayer"', function() {
      expect(players.removePlayer).toBeDefined();
      expect(angular.isFunction(players.removePlayer)).toBeTruthy();
    });

    it('should expose a method "getPlayer"', function() {
      expect(players.getPlayer).toBeDefined();
      expect(angular.isFunction(players.getPlayer)).toBeTruthy();
    });

    it('a player instance should expose a method "resetScore"', function() {
      var player = players.createPlayer('Peter', 301);
      expect(player.resetScore).toBeDefined();
      expect(angular.isFunction(player.resetScore)).toBeTruthy();
    });

    it('a player instance should expose a method "name"', function() {
      var player = players.createPlayer('Peter', 301);
      expect(player.name).toBeDefined();
      expect(angular.isFunction(player.name)).toBeTruthy();
    });

    it('a player instance should expose a method "undoLastMove"', function() {
      var player = players.createPlayer('Peter', 301);
      expect(player.undoLastMove).toBeDefined();
      expect(angular.isFunction(player.undoLastMove)).toBeTruthy();
    });

    it('a player instance should expose a method "makeMove"', function() {
      var player = players.createPlayer('Peter', 301);
      expect(player.makeMove).toBeDefined();
      expect(angular.isFunction(player.makeMove)).toBeTruthy();
    });

    it('a player instance should expose a method "getScore"', function() {
      var player = players.createPlayer('Peter', 301);
      expect(player.getScore).toBeDefined();
      expect(angular.isFunction(player.getScore)).toBeTruthy();
    });

    it('a player instance should expose a method "getMoves"', function() {
      var player = players.createPlayer('Peter', 301);
      expect(player.getMoves).toBeDefined();
      expect(angular.isFunction(player.getMoves)).toBeTruthy();
    });

    it('a player instance should expose a method "email"', function() {
      var player = players.createPlayer('Peter', 301);
      expect(player.email).toBeDefined();
      expect(angular.isFunction(player.email)).toBeTruthy();
    });
  });

  it('should create a player', function() {
    var player = players.createPlayer('Peter', 301);
    expect(player.name()).toEqual("Peter");
    expect(player.getScore()).toEqual(301);
    expect(player.getMoves()).toEqual([]);
  });

  it('should get all players', function() {
    players.createPlayer('Peter', 301);
    players.createPlayer('Jano', 301);

    expect(players.getPlayers().length).toEqual(2);
  });

  it('should get a player by name', function() {
    players.createPlayer('Peter', 301);
    players.createPlayer('Jano', 301);

    var player = players.getPlayer('Jano');
    expect(player.name()).toEqual('Jano');
    expect(player.getScore()).toEqual(301);

    player = players.getPlayer('Jozefina');
    expect(player).toBeNull();
  });

  it('should remove a player by name', function() {
    players.createPlayer('Peter', 301);
    players.createPlayer('Jano', 301);

    expect(players.getPlayers().length).toEqual(2);
    players.removePlayer('Jano');
    expect(players.getPlayers().length).toEqual(1);

    players.removePlayer('Jozefina');
    expect(players.getPlayers().length).toEqual(1);
  });

  it('should make a move', function() {
    var player = players.createPlayer('Peter', 301);
    player.makeMove(25);
    expect(player.getScore()).toEqual(276);
  });

  it('should add the move to the end of the moves collection', function() {
    var player = players.createPlayer('Peter', 301);
    player.makeMove(25);

    var moves = player.getMoves();
    expect(moves[moves.length-1]).toEqual(25);
  });

  it('should only make a move if the move is a non negative number', function() {
    var player = players.createPlayer('Peter', 301);
    player.makeMove(25);
    expect(player.getScore()).toEqual(276);

    var moves = player.getMoves();
    expect(moves.length).toEqual(1);

    player.makeMove(-25);
    expect(player.getScore()).toEqual(276);

    moves = player.getMoves();
    expect(moves.length).toEqual(1);
    expect(moves[moves.length-1]).toEqual(25);

    player.makeMove('x');
    expect(player.getScore()).toEqual(276);

    moves = player.getMoves();
    expect(moves.length).toEqual(1);
    expect(moves[moves.length-1]).toEqual(25);


    player.makeMove(1.2);
    expect(player.getScore()).toEqual(276);

    moves = player.getMoves();
    expect(moves.length).toEqual(1);
    expect(moves[moves.length-1]).toEqual(25);
  });

  it('should make a move with more points than the users score', function() {
    var player = players.createPlayer('Peter', 301);
    player.makeMove(302);
    expect(player.getScore()).toEqual(301);

    var moves = player.getMoves();
    expect(moves[moves.length-1]).toEqual(302);
  });

  it('should reset players score and clear all moves', function() {
    var player = players.createPlayer('Peter', 301);
    player.makeMove(100);

    expect(player.getScore()).toEqual(201);
    expect(player.getMoves().length).toEqual(1);
    player.resetScore();

    expect(player.getScore()).toEqual(301);
    expect(player.getMoves().length).toEqual(0);
  });

  it('should undo last move', function() {
    var player = players.createPlayer('Peter', 301);
    player.makeMove(100);

    expect(player.getScore()).toEqual(201);

    var moves = player.getMoves();
    expect(moves[moves.length-1]).toEqual(100);

    player.undoLastMove();
    expect(player.getScore()).toEqual(301);

    moves = player.getMoves();
    expect(moves.length).toEqual(0);
  });
});
