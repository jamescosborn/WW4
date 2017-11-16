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
      if(player.type === "Gladior") {
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
      $("#enemy-name").text(`${player.currentEnemy[0].name}`);
      $("#enemy-difficulty").text(`Level: ${player.difficulty}`);
      $("#enemy-health").text(`Health: ${player.currentEnemy[0].health}`);
      $("#special-attack-damage").text(`Special Attack Damage: ${player.currentEnemy[0].specialAttack}`);
      $("#encounter-message").empty();
    }, 1000);
  });
  $("#attack").click(function(){
    player.fight("Attack");
    $("#character").text(`${player.name}`);
    $("#character-type-name").text(`${player.type}`);
    $("#character-level").text(`Level: ${player.level}`);
    $("#character-experience").text(`EXP: ${player.experience}/${player.level*100}`);
    $("#character-health").text(`Health: ${player.health}/${100 + ((player.level-1)*10)}`);
    if(player.type === "Gladior") {
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
    $("#enemy-name").text(`${player.currentEnemy[0].name}`);
    $("#enemy-difficulty").text(`Level: ${player.difficulty}`);
    $("#enemy-health").text(`Health: ${player.currentEnemy[0].health}`);
    $("#special-attack-damage").text(`Special Attack Damage: ${player.currentEnemy[0].specialAttack}`);
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
      $(".character-creation").show();
      $("#lose-test").text(`You died to a ${player.currentEnemy[0].name}. Better luck next time!`);
    }
  });
  $("#special-attack").click(function(){
    player.fight("Special Attack");
    $("#character").text(`${player.name}`);
    $("#character-type-name").text(`${player.type}`);
    $("#character-level").text(`Level: ${player.level}`);
    $("#character-experience").text(`EXP: ${player.experience}/${player.level*100}`);
    $("#character-health").text(`Health: ${player.health}/${100 + ((player.level-1)*10)}`);
    if(player.type === "Gladior") {
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
    $("#enemy-name").text(`${player.currentEnemy[0].name}`);
    $("#enemy-difficulty").text(`Level: ${player.difficulty}`);
    $("#enemy-health").text(`Health: ${player.currentEnemy[0].health}`);
    $("#special-attack-damage").text(`Special Attack Damage: ${player.currentEnemy[0].specialAttack}`);
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
  });
  $("#item").click(function(){
    player.fight("Item");
    $("#character").text(`${player.name}`);
    $("#character-type-name").text(`${player.type}`);
    $("#character-level").text(`Level: ${player.level}`);
    $("#character-experience").text(`EXP: ${player.experience}/${player.level*100}`);
    $("#character-health").text(`Health: ${player.health}/${100 + ((player.level-1)*10)}`);
    if(player.type === "Gladior") {
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
    $("#enemy-name").text(`${player.currentEnemy[0].name}`);
    $("#enemy-difficulty").text(`Level: ${player.difficulty}`);
    $("#enemy-health").text(`Health: ${player.currentEnemy[0].health}`);
    $("#special-attack-damage").text(`Special Attack Damage: ${player.currentEnemy[0].specialAttack}`);
    if(player.inventory === 0) {
      $("#item").hide();
    }
  });
});
