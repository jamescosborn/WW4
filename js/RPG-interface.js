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
      $("#character-stats").text(`${player.name} Level: ${player.level}
        Health: ${player.health} Stamina: ${player.stamina} Radiation: ${player.radiation} Potion Count: ${player.inventory} EXP: ${player.experience}/${player.level*100}`);
      $("#enemy-stats").text(`${player.currentEnemy[0].name}'s Health: ${player.currentEnemy[0].health}`);
      $("#encounter-message").empty();
    }, 1000);
  });
  $("#attack").click(function(){
    player.fight("Attack");
    $("#character-stats").text(`${player.name} Level: ${player.level}
      Health: ${player.health} Stamina: ${player.stamina} Radiation: ${player.radiation} Potion Count: ${player.inventory} EXP: ${player.experience}/${player.level*100}`);
    $("#enemy-stats").text(`${player.currentEnemy[0].name}'s Health: ${player.currentEnemy[0].health}`);
    if(player.inventory != 0) {
      $("#item").show();
    }
    if(player.specialAttackTimer >= 100) {
      $("#special-attack").show();
    }
    if(player.gameLose) {
      $("#special-attack").hide();
      $("#special-attack").hide();
      $(".encounter").hide();
      $(".character-creation").show();
      $("#lose-test").text(`You died to a ${player.currentEnemy[0].name}. Better luck next time!`);
    }
  });
  $("#special-attack").click(function(){
    player.fight("Special Attack");
    $("#character-stats").text(`${player.name} Level: ${player.level}
      Health: ${player.health} Stamina: ${player.stamina} Radiation: ${player.radiation} Potion Count: ${player.inventory} EXP: ${player.experience}/${player.level*100}`);
    $("#enemy-stats").text(`${player.currentEnemy[0].name}'s Health: ${player.currentEnemy[0].health}`);
    if(player.specialAttackTimer < 100) {
      $("#special-attack").hide();
    }
    if(player.inventory === 0) {
      $("#item").show();
    }
    if(player.gameLose) {
      $("#special-attack").hide();
      $("#special-attack").hide();
      $(".encounter").hide();
      $(".character-creation").show();
      $("#lose-test").text(`You died to a ${player.currentEnemy[0].name}. Better luck next time!`);
    }
  });
  $("#item").click(function(){
    player.fight("Item");
    $("#character-stats").text(`${player.name} Level: ${player.level}
      Health: ${player.health} Stamina: ${player.stamina} Radiation: ${player.radiation} Potion Count: ${player.inventory} EXP: ${player.experience}/${player.level*100}`);
    $("#enemy-stats").text(`${player.currentEnemy[0].name}'s Health: ${player.currentEnemy[0].health}`);
    if(player.inventory === 0) {
      $("#item").hide();
    }
  });
});
