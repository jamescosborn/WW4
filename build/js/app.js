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
    this.cornPortrait = false;
    this.dragonPortrait = false;
    this.semiPortrait = false;
    this.centaurPortrait = false;
    this.evilPortrait = false;
  }

  _createClass(Player, [{
    key: "typeChooser",
    value: function typeChooser() {
      if (this.type === "Gladiator") {
        this.stamina = 100;
        this.radiation = 100;
        this.physAttacks = ["Bat Swing", "Gut Punch"];
        this.radiationAttacks = ["Gamma Smash", "Toxic Toss"];
        this.specialAttack = "Enrage - Deal quadruple damage and heal yourself for half of every damage point dealt";
      } else if (this.type === "Hunter") {
        this.stamina = 150;
        this.radiation = 50;
        this.physAttacks = ["Bazooka Launch", "Nunchuck Smack", "Butter Knife Stab"];
        this.radiationAttacks = ["Radiation Poison"];
        this.specialAttack = "Charged Shot - Deal 50% of your current stamina as damage times 2";
      } else if (this.type === "Warlock") {
        this.stamina = 50;
        this.radiation = 150;
        this.physAttacks = ["Wand Jab"];
        this.radiationAttacks = ["Toxic Tonic", "Venomous Sneeze", "Voodoo Doll"];
        this.specialAttack = "Devil Deal - Halves your current health, deals your max health times 3 to the enemy";
      }
    }
  }, {
    key: "encounter",
    value: function encounter(difficulty) {
      var enemy = new Enemy(difficulty);
      var encounterMessage = "You have encountered a " + enemy.name;
      if (enemy.name === "...It's your evil twin") {
        this.specialAttackTimer += 100;
      }
      if (enemy.name === "Cyber Woman With Corn") {
        this.cornPortrait = true;
      } else if (enemy.name === "Komodo Dragon Dragon") {
        this.cornPortrait = false;
        this.dragonPortrait = true;
      } else if (enemy.name === "Missing Semicolon") {
        this.dragonPortrait = false;
        this.semiPortrait = true;
      } else if (enemy.name === "Centaur Tyrant") {
        this.semiPortrait = false;
        this.centaurPortrait = true;
      } else if (enemy.name === "...It's your evil twin") {
        this.centaurPortrait = false;
        this.evilPortrait = true;
      } else {
        this.cornPortrait = false;
        this.dragonPortrait = false;
        this.semiPortrait = false;
        this.centaurPortrait = false;
        this.evilPortrait = false;
      }
      this.currentEnemy = [enemy, encounterMessage];
    }
  }, {
    key: "fight",
    value: function fight(playerSelection) {
      if (playerSelection === "Attack" && this.stamina > 0 && this.radiation > 0) {
        this.attack();
      } else if (playerSelection === "Special Attack" && this.specialAttackTimer >= 100) {
        if (this.type === "Gladiator") {
          this.enrage();
        } else if (this.type === "Hunter") {
          this.chargedShot();
        } else {
          this.devilDeal();
        }
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
    key: "enrage",
    value: function enrage() {
      this.currentEnemy[0].health -= this.level * 20;
      this.health += this.level * 10;
      this.stamina -= 20;
      this.radiation -= 20;
      this.specialAttackTimer -= 100;
      if (this.currentEnemy[0].health <= 0) {
        this.win();
      } else {
        this.damagePlayer();
      }
    }
  }, {
    key: "chargedShot",
    value: function chargedShot() {
      this.currentEnemy[0].health -= this.stamina;
      this.specialAttackTimer -= 100;
      if (this.currentEnemy[0].health <= 0) {
        this.win();
      } else {
        this.damagePlayer();
      }
    }
  }, {
    key: "devilDeal",
    value: function devilDeal() {
      this.health /= 2;
      if (this.health <= 0) {
        this.gameLose = true;
      }
      this.currentEnemy[0].health -= (100 + (this.level - 1) * 10) * 3;
      this.radiation -= 20;
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
      if (this.health < 100 + (this.level - 1) * 10 - 30) {
        this.health += 30;
        this.inventory--;
      } else {
        this.health = 100 + (this.level - 1) * 10;
        this.inventory--;
      }
    }
  }, {
    key: "win",
    value: function win() {
      if (this.currentEnemy[0].name === "...It's your evil twin") {
        this.gameWin = true;
      }
      if (this.type === "Gladiator") {
        this.stamina = 100 + (this.level - 1) * 10;
        this.radiation = 100 + (this.level - 1) * 10;
      } else if (this.type === "Hunter") {
        this.stamina = 150 + (this.level - 1) * 10;
        this.radiation = 50 + (this.level - 1) * 10;
      } else if (this.type === "Warlock") {
        this.stamina = 50 + (this.level - 1) * 10;
        this.radiation = 150 + (this.level - 1) * 10;
      }
      this.difficulty++;
      if (this.currentEnemy[0].boss) {
        this.inventory += 5;
        this.experience += this.difficulty * 40;
      } else {
        this.experience += this.difficulty * 20;
        var rng = Math.random() * 100;
        if (rng > 50) {
          this.inventory++;
        }
      }
      this.levelUp(this.level, this.experience);
      this.currentEnemy = [];
      this.encounter(this.difficulty);
    }
  }, {
    key: "levelUp",
    value: function levelUp(level, experience) {
      var expCap = level * 100;
      if (experience >= expCap && level < 50) {
        if (this.health <= 100 + (this.level - 1) * 10) {
          this.level++;
          this.health = 100 + (this.level - 1) * 10;
        } else {
          this.level++;
        }
        this.stamina += 10;
        this.radiation += 10;
        this.experience -= expCap;
      }
    }
  }, {
    key: "damagePlayer",
    value: function damagePlayer() {
      var attack = Math.floor(Math.random() * 100.99);
      if (attack >= 10) {
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

  var enemies = ["Mutated Rat", "Raider", "Giant Cockroach", "Zombie", "Rabid Bunny", "Deathpaw", "Malfunctioning Robot"];
  var bosses = ["Cyber Woman With Corn", "Komodo Dragon Dragon", "Missing Semicolon", "Centaur Tyrant", "...It's your evil twin"];
  if (difficulty % 10 === 0) {
    this.name = bosses[difficulty / 10 - 1];
    this.health = difficulty * 50;
    this.basicAttack = difficulty;
    this.specialAttack = difficulty * 2;
    this.boss = true;
  } else {
    this.name = enemies[Math.floor(Math.random() * 6.9)];
    this.health = difficulty * 5;
    this.basicAttack = difficulty;
    this.specialAttack = difficulty * 2;
    this.boss = false;
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
      $("#character").text("" + player.name);
      $("#character-type-name").text("" + player.type);
      $("#character-level").text("Level: " + player.level);
      $("#character-experience").text("EXP: " + player.experience + "/" + player.level * 100);
      $("#character-health").text("Health: " + player.health + "/" + (100 + (player.level - 1) * 10));
      if (player.type === "Gladiator") {
        $("#character-radiation").text("Radiation: " + player.radiation + "/" + (100 + (player.level - 1) * 10));
        $("#character-stamina").text("Stamina: " + player.stamina + "/" + (100 + (player.level - 1) * 10));
      } else if (player.type === "Hunter") {
        $("#character-radiation").text("Radiation: " + player.radiation + "/" + (50 + (player.level - 1) * 10));
        $("#character-stamina").text("Stamina: " + player.stamina + "/" + (150 + (player.level - 1) * 10));
      } else {
        $("#character-radiation").text("Radiation: " + player.radiation + "/" + (150 + (player.level - 1) * 10));
        $("#character-stamina").text("Stamina: " + player.stamina + "/" + (50 + (player.level - 1) * 10));
      }
      $("#character-inventory").text("Potion Count: " + player.inventory);
      $("#special-timer").text("Special Charge: " + player.specialAttackTimer);
      $("#enemy-name").text("" + player.currentEnemy[0].name);
      $("#enemy-difficulty").text("Level: " + player.difficulty);
      $("#enemy-health").text("Health: " + player.currentEnemy[0].health);
      $("#special-attack-damage").text("Special Attack Damage: " + player.currentEnemy[0].specialAttack);
      if (player.cornPortrait) {
        $("#corn-portrait").show();
        $("#dragon-portrait").hide();
        $("#semi-portrait").hide();
        $("#centaur-portrait").hide();
        $("#evil-portrait").hide();
      } else if (player.dragonPortrait) {
        $("#corn-portrait").hide();
        $("#dragon-portrait").show();
        $("#semi-portrait").hide();
        $("#centaur-portrait").hide();
        $("#evil-portrait").hide();
      } else if (player.semiPortrait) {
        $("#corn-portrait").hide();
        $("#dragon-portrait").hide();
        $("#semi-portrait").show();
        $("#centaur-portrait").hide();
        $("#evil-portrait").hide();
      } else if (player.centaurPortrait) {
        $("#corn-portrait").hide();
        $("#dragon-portrait").hide();
        $("#centaur-portrait").show();
        $("#semi-portrait").hide();
        $("#evil-portrait").hide();
      } else if (player.evilPortrait) {
        $("#corn-portrait").hide();
        $("#dragon-portrait").hide();
        $("#semi-portrait").hide();
        $("#centaur-portrait").hide();
        $("#evil-portrait").show();
      } else {
        $("#corn-portrait").hide();
        $("#dragon-portrait").hide();
        $("#semi-portrait").hide();
        $("#centaur-portrait").hide();
        $("#evil-portrait").hide();
      }
      $("#encounter-message").empty();
    }, 1000);
  });
  $("#attack").click(function () {
    var before = player.currentEnemy[0];
    var level = player.level;
    player.fight("Attack");
    if (before != player.currentEnemy[0]) {
      $(".encounter").hide();
      $("#encounter-message").text("You defeated the " + before.name);
      if (level != player.level) {
        $("#encounter-message").append("<br><br><font color=\"green\">You leveled up!");
      }
      setTimeout(function () {
        $("#encounter-message").text("" + player.currentEnemy[1]);
      }, 1000);
      setTimeout(function () {
        $(".encounter").show();
        $("#encounter-message").empty();
      }, 2000);
    }
    $("#character").text("" + player.name);
    $("#character-type-name").text("" + player.type);
    $("#character-level").text("Level: " + player.level);
    $("#character-experience").text("EXP: " + player.experience + "/" + player.level * 100);
    $("#character-health").text("Health: " + player.health + "/" + (100 + (player.level - 1) * 10));
    if (player.type === "Gladiator") {
      $("#character-radiation").text("Radiation: " + player.radiation + "/" + (100 + (player.level - 1) * 10));
      $("#character-stamina").text("Stamina: " + player.stamina + "/" + (100 + (player.level - 1) * 10));
    } else if (player.type === "Hunter") {
      $("#character-radiation").text("Radiation: " + player.radiation + "/" + (50 + (player.level - 1) * 10));
      $("#character-stamina").text("Stamina: " + player.stamina + "/" + (150 + (player.level - 1) * 10));
    } else {
      $("#character-radiation").text("Radiation: " + player.radiation + "/" + (150 + (player.level - 1) * 10));
      $("#character-stamina").text("Stamina: " + player.stamina + "/" + (50 + (player.level - 1) * 10));
    }
    $("#character-inventory").text("Potion Count: " + player.inventory);
    $("#special-timer").text("Special Charge: " + player.specialAttackTimer);
    $("#enemy-name").text("" + player.currentEnemy[0].name);
    $("#enemy-difficulty").text("Level: " + player.difficulty);
    $("#enemy-health").text("Health: " + player.currentEnemy[0].health);
    $("#special-attack-damage").text("Special Attack Damage: " + player.currentEnemy[0].specialAttack);
    if (player.cornPortrait) {
      $("#corn-portrait").show();
      $("#dragon-portrait").hide();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.dragonPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").show();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.semiPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").hide();
      $("#semi-portrait").show();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.centaurPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").hide();
      $("#centaur-portrait").show();
      $("#semi-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.evilPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").hide();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").show();
    } else {
      $("#evil-portrait").hide();
      $("#centaur-portrait").hide();
      $("#semi-portrait").hide();
      $("#dragon-portrait").hide();
      $("#corn-portrait").hide();
    }
    if (player.inventory != 0) {
      $("#item").show();
    }
    if (player.specialAttackTimer >= 100) {
      $("#special-attack").show();
    }
    if (player.gameLose) {
      $("#special-attack").hide();
      $("#item").hide();
      $(".encounter").hide();
      $("#lose-test").text("You died to a " + player.currentEnemy[0].name + ". Better luck next time!");
      setTimeout(function () {
        $(".character-creation").show();
        $("#lose-test").empty();
      }, 1000);
    }
    if (player.gameWin) {
      $("#special-attack").hide();
      $("#item").hide();
      $(".encounter").hide();
      setTimeout(function () {
        $(".character-creation").show();
      }, 1000);
      $(".character-creation").show();
    }
  });
  $("#special-attack").click(function () {
    var before = player.currentEnemy[0];
    var level = player.level;
    player.fight("Special Attack");
    if (before != player.currentEnemy[0]) {
      $(".encounter").hide();
      $("#encounter-message").text("You defeated " + before.name);
      if (level != player.level) {
        $("#encounter-message").append("<br><br><font color=\"green\">You leveled up!");
      }
      setTimeout(function () {
        $("#encounter-message").text("" + player.currentEnemy[1]);
      }, 1000);
      setTimeout(function () {
        $(".encounter").show();
        $("#encounter-message").empty();
      }, 2000);
    }
    $("#character").text("" + player.name);
    $("#character-type-name").text("" + player.type);
    $("#character-level").text("Level: " + player.level);
    $("#character-experience").text("EXP: " + player.experience + "/" + player.level * 100);
    $("#character-health").text("Health: " + player.health + "/" + (100 + (player.level - 1) * 10));
    if (player.type === "Gladiator") {
      $("#character-radiation").text("Radiation: " + player.radiation + "/" + (100 + (player.level - 1) * 10));
      $("#character-stamina").text("Stamina: " + player.stamina + "/" + (100 + (player.level - 1) * 10));
    } else if (player.type === "Hunter") {
      $("#character-radiation").text("Radiation: " + player.radiation + "/" + (50 + (player.level - 1) * 10));
      $("#character-stamina").text("Stamina: " + player.stamina + "/" + (150 + (player.level - 1) * 10));
    } else {
      $("#character-radiation").text("Radiation: " + player.radiation + "/" + (150 + (player.level - 1) * 10));
      $("#character-stamina").text("Stamina: " + player.stamina + "/" + (50 + (player.level - 1) * 10));
    }
    $("#character-inventory").text("Potion Count: " + player.inventory);
    $("#special-timer").text("Special Charge: " + player.specialAttackTimer);
    $("#enemy-name").text("" + player.currentEnemy[0].name);
    $("#enemy-difficulty").text("Level: " + player.difficulty);
    $("#enemy-health").text("Health: " + player.currentEnemy[0].health);
    $("#special-attack-damage").text("Special Attack Damage: " + player.currentEnemy[0].specialAttack);
    if (player.cornPortrait) {
      $("#corn-portrait").show();
      $("#dragon-portrait").hide();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.dragonPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").show();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.semiPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").hide();
      $("#semi-portrait").show();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.centaurPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").hide();
      $("#centaur-portrait").show();
      $("#semi-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.evilPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").hide();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").show();
    } else {
      $("#evil-portrait").hide();
      $("#centaur-portrait").hide();
      $("#semi-portrait").hide();
      $("#dragon-portrait").hide();
      $("#corn-portrait").hide();
    }
    if (player.specialAttackTimer < 100) {
      $("#special-attack").hide();
    }
    if (player.inventory != 0) {
      $("#item").show();
    }
    if (player.gameLose) {
      $("#special-attack").hide();
      $("#item").hide();
      $(".encounter").hide();
      $(".character-creation").show();
      $("#lose-test").text("You died to a " + player.currentEnemy[0].name + ". Better luck next time!");
    }
    if (player.gameWin) {
      $("#special-attack").hide();
      $("#item").hide();
      $(".encounter").hide();
      $(".character-creation").show();
    }
  });
  $("#item").click(function () {
    player.fight("Item");
    $("#character").text("" + player.name);
    $("#character-type-name").text("" + player.type);
    $("#character-level").text("Level: " + player.level);
    $("#character-experience").text("EXP: " + player.experience + "/" + player.level * 100);
    $("#character-health").text("Health: " + player.health + "/" + (100 + (player.level - 1) * 10));
    if (player.type === "Gladiator") {
      $("#character-radiation").text("Radiation: " + player.radiation + "/" + (100 + (player.level - 1) * 10));
      $("#character-stamina").text("Stamina: " + player.stamina + "/" + (100 + (player.level - 1) * 10));
    } else if (player.type === "Hunter") {
      $("#character-radiation").text("Radiation: " + player.radiation + "/" + (50 + (player.level - 1) * 10));
      $("#character-stamina").text("Stamina: " + player.stamina + "/" + (150 + (player.level - 1) * 10));
    } else {
      $("#character-radiation").text("Radiation: " + player.radiation + "/" + (150 + (player.level - 1) * 10));
      $("#character-stamina").text("Stamina: " + player.stamina + "/" + (50 + (player.level - 1) * 10));
    }
    $("#character-inventory").text("Potion Count: " + player.inventory);
    $("#special-timer").text("Special Charge: " + player.specialAttackTimer);
    $("#enemy-name").text("" + player.currentEnemy[0].name);
    $("#enemy-difficulty").text("Level: " + player.difficulty);
    $("#enemy-health").text("Health: " + player.currentEnemy[0].health);
    $("#special-attack-damage").text("Special Attack Damage: " + player.currentEnemy[0].specialAttack);
    if (player.cornPortrait) {
      $("#corn-portrait").show();
      $("#dragon-portrait").hide();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.dragonPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").show();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.semiPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").hide();
      $("#semi-portrait").show();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.centaurPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").hide();
      $("#centaur-portrait").show();
      $("#semi-portrait").hide();
      $("#evil-portrait").hide();
    } else if (player.evilPortrait) {
      $("#corn-portrait").hide();
      $("#dragon-portrait").hide();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").show();
    } else {
      $("#evil-portrait").hide();
      $("#centaur-portrait").hide();
      $("#semi-portrait").hide();
      $("#dragon-portrait").hide();
      $("#corn-portrait").hide();
    }
    if (player.inventory === 0) {
      $("#item").hide();
    }
  });
  $("#start").click(function () {
    $(".game-start").hide();
    $(".character-creation").show();
  });
  $("#name-generator").click(function () {
    var listOfNames = ["The Big Taco", "Oz", "Bizzclaw", "Lydian Lights", "Lab Rat", "Carbon the Destroyer", "Wunderkid", "Recyclops", "Black Sabbath 2", "Player Unknown", "Will Smith", "Don't Call Me Bobby", "BioPunk", "Dr. Smiles", "Mud", "The Warthog", "Your Nightmare", "The HR Machine", "Alient Ant Farm"];
    $("#character-name").val(listOfNames[Math.floor(Math.random() * listOfNames.length)]);
  });
});

},{"./../js/RPG.js":1}]},{},[2]);
