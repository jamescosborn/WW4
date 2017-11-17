import { Player } from './../js/RPG.js';


$(document).ready(function(){
  $(".encounter").hide();
  let player = new Player();
  if(player.inventory === 0) {
    $("#item").hide();
  }
  if(player.specialAttackTimer != 100 || player.specialAttackTimer > 100) {
    $("#special-attack").hide();
  }
  $("#create").submit(function(event){
    event.preventDefault();
    player = new Player($("#character-name").val(), $("#character-type").val());
    player.typeChooser();
    player.encounter(player.difficulty);
    $(".character-creation").hide();
    $("#encounter-message").text(`${player.currentEnemy[1]}`);
    setTimeout(function(){
      $(".encounter").show();
      $("#character").text(`${player.name}`);
      $("#character-type-name").text(`${player.type}`);
      $("#character-level").text(`Level: ${player.level}`);
      $("#character-experience").text(`EXP: ${player.experience}/${player.level*100}`);
      $("#character-health").text(`Health: ${player.health}/${100 + ((player.level-1)*10)}`);
      if(player.type === "Gladiator") {
        $("#character-radiation").text(`Radiation: ${player.radiation}/${100 + ((player.level-1)*10)}`);
        $("#character-stamina").text(`Stamina: ${player.stamina}/${100 + ((player.level-1)*10)}`);
      } else if (player.type === "Hunter") {
        $("#character-radiation").text(`Radiation: ${player.radiation}/${50 + ((player.level-1)*10)}`);
        $("#character-stamina").text(`Stamina: ${player.stamina}/${150 + ((player.level-1)*10)}`);
      } else {
        $("#character-radiation").text(`Radiation: ${player.radiation}/${150 + ((player.level-1)*10)}`);
        $("#character-stamina").text(`Stamina: ${player.stamina}/${50 + ((player.level-1)*10)}`);
      }
      $("#character-inventory").text(`Potion Count: ${player.inventory}`);
      $("#special-timer").text(`Special Charge: ${player.specialAttackTimer}`);
      $("#enemy-name").text(`${player.currentEnemy[0].name}`);
      $("#enemy-difficulty").text(`Level: ${player.difficulty}`);
      $("#enemy-health").text(`Health: ${player.currentEnemy[0].health}`);
      $("#special-attack-damage").text(`Special Attack Damage: ${player.currentEnemy[0].specialAttack}`);
      if(player.cornPortrait) {
        $("#corn-portrait").show();
        $("#dragon-portrait").hide();
        $("#semi-portrait").hide();
        $("#centaur-portrait").hide();
        $("#evil-portrait").hide();
      } else if(player.dragonPortrait) {
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
  $("#attack").click(function(){
    let before = player.currentEnemy[0];
    let level = player.level;
    player.fight("Attack");
    if(before != player.currentEnemy[0])
    {
      $(".encounter").hide();
      $("#encounter-message").text(`You defeated the ${before.name}`);
      if(level != player.level) {
        $("#encounter-message").append(`<br><br><font color="green">You leveled up!`);
      }
      setTimeout(function(){
        $("#encounter-message").text(`${player.currentEnemy[1]}`);
      }, 1000);
      setTimeout(function(){
        $(".encounter").show();
        $("#encounter-message").empty();
      }, 2000);
    }
    $("#character").text(`${player.name}`);
    $("#character-type-name").text(`${player.type}`);
    $("#character-level").text(`Level: ${player.level}`);
    $("#character-experience").text(`EXP: ${player.experience}/${player.level*100}`);
    $("#character-health").text(`Health: ${player.health}/${100 + ((player.level-1)*10)}`);
    if(player.type === "Gladiator") {
      $("#character-radiation").text(`Radiation: ${player.radiation}/${100 + ((player.level-1)*10)}`);
      $("#character-stamina").text(`Stamina: ${player.stamina}/${100 + ((player.level-1)*10)}`);
    } else if (player.type === "Hunter") {
      $("#character-radiation").text(`Radiation: ${player.radiation}/${50 + ((player.level-1)*10)}`);
      $("#character-stamina").text(`Stamina: ${player.stamina}/${150 + ((player.level-1)*10)}`);
    } else {
      $("#character-radiation").text(`Radiation: ${player.radiation}/${150 + ((player.level-1)*10)}`);
      $("#character-stamina").text(`Stamina: ${player.stamina}/${50 + ((player.level-1)*10)}`);
    }
    $("#character-inventory").text(`Potion Count: ${player.inventory}`);
    $("#special-timer").text(`Special Charge: ${player.specialAttackTimer}`);
    $("#enemy-name").text(`${player.currentEnemy[0].name}`);
    $("#enemy-difficulty").text(`Level: ${player.difficulty}`);
    $("#enemy-health").text(`Health: ${player.currentEnemy[0].health}`);
    $("#special-attack-damage").text(`Special Attack Damage: ${player.currentEnemy[0].specialAttack}`);
    if(player.cornPortrait) {
      $("#corn-portrait").show();
      $("#dragon-portrait").hide();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if(player.dragonPortrait) {
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
    if(player.inventory != 0) {
      $("#item").show();
    }
    if(player.specialAttackTimer >= 100) {
      $("#special-attack").show();
    }
    if(player.gameLose) {
      $("#special-attack").hide();
      $("#item").hide();
      $(".encounter").hide();
      $("#lose-test").text(`You died to a ${player.currentEnemy[0].name}. Better luck next time!`);
      setTimeout(function(){
        $(".character-creation").show();
        $("#lose-test").empty();
      }, 1000);
    }
    if(player.gameWin) {
      $("#special-attack").hide();
      $("#item").hide();
      $(".encounter").hide();
      setTimeout(function(){
        $(".character-creation").show();
      }, 1000);
      $(".character-creation").show();
    }
  });
  $("#special-attack").click(function(){
    let before = player.currentEnemy[0];
    let level = player.level;
    player.fight("Special Attack");
    if(before != player.currentEnemy[0])
    {
      $(".encounter").hide();
      $("#encounter-message").text(`You defeated ${before.name}`);
      if(level != player.level) {
        $("#encounter-message").append(`<br><br><font color="green">You leveled up!`);
      }
      setTimeout(function(){
        $("#encounter-message").text(`${player.currentEnemy[1]}`);
      }, 1000);
      setTimeout(function(){
        $(".encounter").show();
        $("#encounter-message").empty();
      }, 2000);
    }
    $("#character").text(`${player.name}`);
    $("#character-type-name").text(`${player.type}`);
    $("#character-level").text(`Level: ${player.level}`);
    $("#character-experience").text(`EXP: ${player.experience}/${player.level*100}`);
    $("#character-health").text(`Health: ${player.health}/${100 + ((player.level-1)*10)}`);
    if(player.type === "Gladiator") {
      $("#character-radiation").text(`Radiation: ${player.radiation}/${100 + ((player.level-1)*10)}`);
      $("#character-stamina").text(`Stamina: ${player.stamina}/${100 + ((player.level-1)*10)}`);
    } else if (player.type === "Hunter") {
      $("#character-radiation").text(`Radiation: ${player.radiation}/${50 + ((player.level-1)*10)}`);
      $("#character-stamina").text(`Stamina: ${player.stamina}/${150 + ((player.level-1)*10)}`);
    } else {
      $("#character-radiation").text(`Radiation: ${player.radiation}/${150 + ((player.level-1)*10)}`);
      $("#character-stamina").text(`Stamina: ${player.stamina}/${50 + ((player.level-1)*10)}`);
    }
    $("#character-inventory").text(`Potion Count: ${player.inventory}`);
    $("#special-timer").text(`Special Charge: ${player.specialAttackTimer}`);
    $("#enemy-name").text(`${player.currentEnemy[0].name}`);
    $("#enemy-difficulty").text(`Level: ${player.difficulty}`);
    $("#enemy-health").text(`Health: ${player.currentEnemy[0].health}`);
    $("#special-attack-damage").text(`Special Attack Damage: ${player.currentEnemy[0].specialAttack}`);
    if(player.cornPortrait) {
      $("#corn-portrait").show();
      $("#dragon-portrait").hide();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if(player.dragonPortrait) {
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
    if(player.specialAttackTimer < 100) {
      $("#special-attack").hide();
    }
    if(player.inventory != 0) {
      $("#item").show();
    }
    if(player.gameLose) {
      $("#special-attack").hide();
      $("#item").hide();
      $(".encounter").hide();
      $(".character-creation").show();
      $("#lose-test").text(`You died to a ${player.currentEnemy[0].name}. Better luck next time!`);
    }
    if(player.gameWin) {
      $("#special-attack").hide();
      $("#item").hide();
      $(".encounter").hide();
      $(".character-creation").show();
    }
  });
  $("#item").click(function(){
    player.fight("Item");
    $("#character").text(`${player.name}`);
    $("#character-type-name").text(`${player.type}`);
    $("#character-level").text(`Level: ${player.level}`);
    $("#character-experience").text(`EXP: ${player.experience}/${player.level*100}`);
    $("#character-health").text(`Health: ${player.health}/${100 + ((player.level-1)*10)}`);
    if(player.type === "Gladiator") {
      $("#character-radiation").text(`Radiation: ${player.radiation}/${100 + ((player.level-1)*10)}`);
      $("#character-stamina").text(`Stamina: ${player.stamina}/${100 + ((player.level-1)*10)}`);
    } else if (player.type === "Hunter") {
      $("#character-radiation").text(`Radiation: ${player.radiation}/${50 + ((player.level-1)*10)}`);
      $("#character-stamina").text(`Stamina: ${player.stamina}/${150 + ((player.level-1)*10)}`);
    } else {
      $("#character-radiation").text(`Radiation: ${player.radiation}/${150 + ((player.level-1)*10)}`);
      $("#character-stamina").text(`Stamina: ${player.stamina}/${50 + ((player.level-1)*10)}`);
    }
    $("#character-inventory").text(`Potion Count: ${player.inventory}`);
    $("#special-timer").text(`Special Charge: ${player.specialAttackTimer}`);
    $("#enemy-name").text(`${player.currentEnemy[0].name}`);
    $("#enemy-difficulty").text(`Level: ${player.difficulty}`);
    $("#enemy-health").text(`Health: ${player.currentEnemy[0].health}`);
    $("#special-attack-damage").text(`Special Attack Damage: ${player.currentEnemy[0].specialAttack}`);
    if(player.cornPortrait) {
      $("#corn-portrait").show();
      $("#dragon-portrait").hide();
      $("#semi-portrait").hide();
      $("#centaur-portrait").hide();
      $("#evil-portrait").hide();
    } else if(player.dragonPortrait) {
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
    if(player.inventory === 0) {
      $("#item").hide();
    }
  });
  $("#start").click(function(){
    $(".game-start").hide();
    $(".character-creation").show();
  });
  $("#name-generator").click(function() {
    const listOfNames = ["The Big Taco", "Oz", "Bizzclaw", "Lydian Lights", "Lab Rat", "Carbon the Destroyer", "Wunderkid", "Recyclops", "Black Sabbath 2", "Player Unknown", "Will Smith", "Don't Call Me Bobby", "BioPunk", "Dr. Smiles", "Mud", "The Warthog", "Your Nightmare", "The HR Machine", "Alient Ant Farm"];
    $("#character-name").val(listOfNames[Math.floor(Math.random() * listOfNames.length)]);
  });
});
