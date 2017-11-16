(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    this.damage = 10;
    this.currentEnemy = [];
    this.inventory = 0;
    this.experience = 0;
    this.level = 1;
    this.difficulty = 1;
    this.gameWin = false;
    this.gameLose = false;
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
    key: "encounter",
    value: function encounter(difficulty) {
      if (this.gameWin === true) {
        return "You won the game";
      }
      var enemy = new Enemy(difficulty);
      var encounterMessage = "You have encountered a " + enemy.name;
      this.currentEnemy = [enemy, encounterMessage];
    }
  }, {
    key: "fight",
    value: function fight(playerSelection) {
      if (playerSelection === "Attack" && this.stamina > 0 && this.radiation > 0) {
        this.attack();
      } else if (playerSelection === "Special Attack" && this.specialAttackTimer >= 100) {
        this.special();
      } else if (playerSelection === "Item" && this.inventory != 0) {
        this.useItem();
      } else {
        return "not a valid move";
      }
    }
  }, {
    key: "attack",
    value: function attack() {
      this.currentEnemy[0].health -= this.level * 2;
      this.stamina -= 1;
      this.radiation -= 1;
      this.specialAttackTimer += 10;
      if (this.currentEnemy[0].health <= 0) {
        this.win();
      } else {
        this.damagePlayer();
      }
    }
  }, {
    key: "special",
    value: function special() {
      this.currentEnemy[0].health -= this.level * 4;
      this.specialAttackTimer -= 100;
      if (this.currentEnemy[0].health <= 0) {
        this.win();
      } else {
        this.damagePlayer();
      }
    }
  }, {
    key: "useItem",
    value: function useItem() {
      if (this.health < 80) {
        this.health += 20;
        this.inventory--;
      } else {
        this.health = 100;
        this.inventory--;
      }
    }
  }, {
    key: "win",
    value: function win() {
      if (this.currentEnemy[0].name === "...It's your evil twin") {
        this.gameWin = true;
      }
      this.currentEnemy = [];
      this.inventory++;
      if (this.type === "Irradiated Gladior") {
        this.stamina = 100 + this.level * 10;
        this.radiation = 100 + this.level * 10;
      } else if (this.type === "Centaur Hunter") {
        this.stamina = 150 + this.level * 20;
        this.radiation = 50 + this.level * 5;
      } else if (this.type === "Noxious Warlock") {
        this.stamina = 50 + this.level * 5;
        this.radiation = 150 + this.level * 20;
      }
      this.experience += this.difficulty * 10;
      this.levelUp(this.level, this.experience);
      this.difficulty++;
      this.encounter(this.difficulty);
    }
  }, {
    key: "levelUp",
    value: function levelUp(level, experience) {
      var expCap = level * 100;
      if (experience >= expCap && level < 50) {
        this.level++;
        this.health = 100 + this.level * 10;
        this.stamina += 10;
        this.radiation += 10;
        this.experience = 0;
      }
    }
  }, {
    key: "damagePlayer",
    value: function damagePlayer() {
      var attack = Math.floor(Math.random() * 1.99);
      if (attack === 1) {
        this.health -= this.currentEnemy[0].basicAttack;
      } else {
        this.health -= this.currentEnemy[0].specialAttack;
      }
      if (this.health <= 0) {
        this.gameLose = true;
      }
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
    this.basicAttack = difficulty;
    this.specialAttack = difficulty * 2;
  }
};

},{}],2:[function(require,module,exports){
"use strict";

var _RPG = require("./../js/RPG.js");

$(document).ready(function () {
  $(".encounter").hide();
  var player = new _RPG.Player();
  if (player.inventory === 0) {
    $("#item").hide();
  }
  if (player.specialAttackTimer != 100 || player.specialAttackTimer > 100) {
    $("#special-attack").hide();
  }
  $("#create").submit(function (event) {
    event.preventDefault();
    player = new _RPG.Player($("#character-name").val(), $("#character-type").val());
    player.typeChooser();
    player.encounter(player.difficulty);
    $(".character-creation").hide();
    $("#encounter-message").text("" + player.currentEnemy[1]);
    setTimeout(function () {
      $(".encounter").show();
      $("#character-stats").text(player.name + " Level: " + player.level + "\n        Health: " + player.health + " Stamina: " + player.stamina + " Radiation: " + player.radiation + " Potion Count: " + player.inventory + " EXP: " + player.experience + "/" + player.level * 100);
      $("#enemy-stats").text(player.currentEnemy[0].name + "'s Health: " + player.currentEnemy[0].health);
      $("#encounter-message").empty();
    }, 1000);
  });
  $("#attack").click(function () {
    player.fight("Attack");
    $("#character-stats").text(player.name + " Level: " + player.level + "\n      Health: " + player.health + " Stamina: " + player.stamina + " Radiation: " + player.radiation + " Potion Count: " + player.inventory + " EXP: " + player.experience + "/" + player.level * 100);
    $("#enemy-stats").text(player.currentEnemy[0].name + "'s Health: " + player.currentEnemy[0].health);
    if (player.inventory != 0) {
      $("#item").show();
    }
    if (player.specialAttackTimer >= 100) {
      $("#special-attack").show();
    }
    if (player.gameLose) {
      $("#special-attack").hide();
      $("#special-attack").hide();
      $(".encounter").hide();
      $(".character-creation").show();
      $("#lose-test").text("You died to a " + player.currentEnemy[0].name + ". Better luck next time!");
    }
  });
  $("#special-attack").click(function () {
    player.fight("Special Attack");
    $("#character-stats").text(player.name + " Level: " + player.level + "\n      Health: " + player.health + " Stamina: " + player.stamina + " Radiation: " + player.radiation + " Potion Count: " + player.inventory + " EXP: " + player.experience + "/" + player.level * 100);
    $("#enemy-stats").text(player.currentEnemy[0].name + "'s Health: " + player.currentEnemy[0].health);
    if (player.specialAttackTimer < 100) {
      $("#special-attack").hide();
    }
    if (player.inventory === 0) {
      $("#item").show();
    }
    if (player.gameLose) {
      $("#special-attack").hide();
      $("#special-attack").hide();
      $(".encounter").hide();
      $(".character-creation").show();
      $("#lose-test").text("You died to a " + player.currentEnemy[0].name + ". Better luck next time!");
    }
  });
  $("#item").click(function () {
    player.fight("Item");
    $("#character-stats").text(player.name + " Level: " + player.level + "\n      Health: " + player.health + " Stamina: " + player.stamina + " Radiation: " + player.radiation + " Potion Count: " + player.inventory + " EXP: " + player.experience + "/" + player.level * 100);
    $("#enemy-stats").text(player.currentEnemy[0].name + "'s Health: " + player.currentEnemy[0].health);
    if (player.inventory === 0) {
      $("#item").hide();
    }
  });
});

},{"./../js/RPG.js":1}]},{},[2]);
