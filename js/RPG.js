export class Player {
  constructor(name, type) {
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
  typeChooser() {
    if(this.type === "Gladiator") {
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
  encounter(difficulty) {
    const enemy = new Enemy(difficulty);
    const encounterMessage = `You have encountered a ${enemy.name}`;
    if(enemy.name === "...It's your evil twin") {
      this.specialAttackTimer += 100;
    }
    if(enemy.name === "Cyber Woman With Corn") {
      this.cornPortrait = true;
    } else if(enemy.name === "Komodo Dragon Dragon") {
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
  fight(playerSelection) {
    if(playerSelection === "Attack" && this.stamina > 0 && this.radiation > 0) {
      this.attack();
    } else if (playerSelection === "Special Attack" && this.specialAttackTimer >= 100) {
      if(this.type === "Gladiator") {
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
  attack() {
    this.currentEnemy[0].health -= this.level * 2;
    this.stamina -= 1;
    this.radiation -=1;
    this.specialAttackTimer += 10;
    if(this.currentEnemy[0].health <= 0) {
      this.win();
    } else {
      this.damagePlayer();
    }
  }
  enrage() {
    this.currentEnemy[0].health -= this.level * 20;
    this.health += this.level * 10;
    this.stamina -= 20;
    this.radiation -= 20;
    this.specialAttackTimer -= 100;
    if(this.currentEnemy[0].health <= 0) {
      this.win();
    } else {
      this.damagePlayer();
    }
  }
  chargedShot() {
    this.currentEnemy[0].health -= this.stamina;
    this.specialAttackTimer -= 100;
    if(this.currentEnemy[0].health <= 0) {
      this.win();
    } else {
      this.damagePlayer();
    }
  }
  devilDeal() {
    this.health /= 2;
    if(this.health <= 0) {
      this.gameLose = true;
    }
    this.currentEnemy[0].health -= (100 + (this.level-1) * 10) * 3;
    this.radiation -= 20;
    this.specialAttackTimer -= 100;
    if(this.currentEnemy[0].health <= 0) {
      this.win();
    } else {
      this.damagePlayer();
    }
  }
  useItem() {
    if(this.health < (100 + ((this.level-1)*10) - 30)) {
      this.health += 30;
      this.inventory--;
    } else {
      this.health = 100 + ((this.level-1)*10);
      this.inventory--;
    }
  }
  win() {
    if(this.currentEnemy[0].name === "...It's your evil twin") {
      this.gameWin = true;
    }
    if(this.type === "Gladiator") {
      this.stamina = 100 + ((this.level-1)*10);
      this.radiation = 100 + ((this.level-1)*10);
    } else if (this.type === "Hunter") {
      this.stamina = 150 + ((this.level-1)*10);
      this.radiation = 50 + ((this.level-1)*10);
    } else if (this.type === "Warlock") {
      this.stamina = 50 + ((this.level-1)*10);
      this.radiation = 150  + ((this.level-1)*10);
    }
    this.difficulty++;
    if(this.currentEnemy[0].boss) {
      this.inventory += 5;
      this.experience += this.difficulty * 40
    } else {
      this.experience += this.difficulty * 20;
      let rng = Math.random() * 100;
      if(rng > 50) {
        this.inventory++;
      }
    }
    this.levelUp(this.level, this.experience);
    this.currentEnemy = [];
    this.encounter(this.difficulty);
  }
  levelUp(level, experience) {
    const expCap = level*100;
    if(experience >= expCap && level < 50) {
      if(this.health <= 100 + ((this.level-1)*10)){
        this.level++;
        this.health = 100 + ((this.level-1)*10);
      } else {
        this.level++;
      }
      this.stamina += 10;
      this.radiation += 10;
      this.experience -= expCap;
    }
  }
  damagePlayer() {
    let attack = Math.floor(Math.random()*100.99);
    if(attack >= 10) {
      this.health -= this.currentEnemy[0].basicAttack;
    } else {
      this.health -= this.currentEnemy[0].specialAttack;
    }
    if(this.health <= 0) {
      this.gameLose = true;
    }
  }
}
export class Enemy {
  constructor(difficulty) {
    const enemies = ["Mutated Rat", "Raider", "Giant Cockroach", "Zombie", "Rabid Bunny", "Deathpaw", "Malfunctioning Robot"];
    const bosses = ["Cyber Woman With Corn", "Komodo Dragon Dragon", "Missing Semicolon", "Centaur Tyrant", "...It's your evil twin"];
    if (difficulty%10 === 0) {
      this.name = bosses[(difficulty/10) - 1];
      this.health = difficulty*50;
      this.basicAttack = difficulty;
      this.specialAttack = difficulty*2;
      this.boss = true;
    } else {
      this.name = enemies[Math.floor(Math.random() * 6.9)];
      this.health = difficulty*5;
      this.basicAttack = difficulty;
      this.specialAttack = difficulty*2;
      this.boss = false;
    }
  }
}
