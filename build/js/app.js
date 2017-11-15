(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(document).ready(function () {});

var Player = exports.Player = function () {
  function Player(name, type) {
    _classCallCheck(this, Player);

    this.name = name;
    this.type = type;
    this.health = 100;
    this.stamina = 0;
    this.radiation = 0;
    this.physAttacks = [];
    this.radiationAttacks = [];
    this.specialAttack = "";
    this.specialAttackTimer = 0;
    this.inventory = ["stick", "stone"];
    this.experience = 0;
    this.level = 1;
    this.difficulty = 0;
  }

  _createClass(Player, [{
    key: "typeChooser",
    value: function typeChooser() {
      if (this.type === "Irradiated Gladior") {
        this.stamina = 100;
        this.radiation = 100;
        this.physAttacks = ["Bat Swing", "Gut Punch"];
        this.radiationAttacks = ["Gamma Smash", "Toxic Toss"];
        this.specialAttack = "Enrage - Deal double damage and heal yourself for every damage point dealt";
      } else if (this.type === "Centaur Hunter") {
        this.stamina = 150;
        this.radiation = 50;
        this.physAttacks = ["Bazooka Launch", "Nunchuck Smack", "Butter Knife Stab"];
        this.radiationAttacks = ["Radiation Poison"];
        this.specialAttack = "Stink Bomb - Enemy misses next 2 attacks, YOUR next 2 attacks are poisoned";
      } else if (this.type === "Noxious Warlock") {
        this.stamina = 50;
        this.radiation = 150;
        this.physAttacks = ["Wand Jab"];
        this.radiationAttacks = ["Toxic Tonic", "Venomous Sneeze", "Voodoo Doll"];
        this.specialAttack = "Devil Deal - Halves your current health and the enemy's current health, restores all radiation";
      }
    }
  }, {
    key: "levelUp",
    value: function levelUp(level, experience) {
      var expCap = level * 100;
      if (experience >= expCap && level < 50) {
        this.level++;
        this.health += 10;
        this.stamina += 10;
        this.radiation += 10;
      }
    }
  }, {
    key: "encounter",
    value: function encounter(difficulty) {
      var enemy = new Enemy(difficulty);
      var encounterMessage = "You have encountered a " + enemy.name;
      var result = [enemy, encounterMessage];
      return result;
    }
  }]);

  return Player;
}();

var Enemy = exports.Enemy = function Enemy(difficulty) {
  _classCallCheck(this, Enemy);

  var enemies = ["Mutated Rat", "Raider", "Giant Cockroach", "Zombie", "Rabid Bunny", "Deathpaw", "John Cena Meme"];
  var bosses = ["Cyber Woman With Corn", "Komodo Dragon Dragon", "Missing Semicolon", "Centaur", "...It's your evil twin"];
  if (difficulty % 10 === 0) {
    this.name = bosses[difficulty / 10 - 1];
    this.health = difficulty * 100;
    this.basicAttack = Math.floor(difficulty * 1.5);
    this.specialAttack = difficulty * 3;
  } else {
    this.name = enemies[Math.floor(Math.random() * 6.9)];
    this.health = difficulty * 5;
    this.basicAttack = Math.floor(difficulty / 2);
    this.specialAttack = difficulty;
  }
};

},{}]},{},[1]);
