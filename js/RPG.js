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
  }
  typeChooser() {
    if(this.type === "Irradiated Gladior") {
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
  encounter(difficulty) {
    if(this.gameWin === true) {
      return "You won the game";
    }
    const enemy = new Enemy(difficulty);
    const encounterMessage = `You have encountered a ${enemy.name}`;
    this.currentEnemy = [enemy, encounterMessage];
  }
  fight(playerSelection) {
    if(playerSelection === "Attack" && this.stamina > 0 && this.radiation > 0) {
      this.attack();
    } else if (playerSelection === "Special Attack" && this.specialAttackTimer >= 100) {
      this.special();
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
  special() {
    this.currentEnemy[0].health -= this.level * 4;
    this.specialAttackTimer -= 100;
    if(this.currentEnemy[0].health <= 0) {
      this.win();
    } else {
      this.damagePlayer();
    }
  }
  useItem() {
    if(this.health < 80) {
      this.health += 20;
      this.inventory--;
    } else {
      this.health = 100;
      this.inventory--;
    }
  }
  win() {
    if(this.currentEnemy[0].name === "...It's your evil twin") {
      this.gameWin = true;
    }
    this.currentEnemy = [];
    this.inventory++;
    if(this.type === "Irradiated Gladior") {
      this.stamina = 100 + (this.level*10);
      this.radiation = 100 + (this.level*10);
    } else if (this.type === "Centaur Hunter") {
      this.stamina = 150 + (this.level*20);
      this.radiation = 50 + (this.level*5);
    } else if (this.type === "Noxious Warlock") {
      this.stamina = 50 + (this.level*5);
      this.radiation = 150  + (this.level*20);
    }
    this.experience += this.difficulty * 10;
    this.levelUp(this.level, this.experience);
    this.difficulty++;
    this.encounter(this.difficulty);
  }
  levelUp(level, experience) {
    const expCap = level*100;
    if(experience >= expCap && level < 50) {
      this.level++;
      this.health = 100 + (this.level*10);
      this.stamina += 10;
      this.radiation += 10;
      this.experience = 0;
    }
  }
  damagePlayer() {
    let attack = Math.floor(Math.random()*1.99);
    if(attack === 1) {
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
    const enemies = ["Mutated Rat", "Raider", "Giant Cockroach", "Zombie", "Rabid Bunny", "Deathpaw", "John Cena Meme"];
    const bosses = ["Cyber Woman With Corn", "Komodo Dragon Dragon", "Missing Semicolon", "Centaur", "...It's your evil twin"];
    if (difficulty%10 === 0) {
      this.name = bosses[(difficulty/10) - 1];
      this.health = difficulty*100;
      this.basicAttack = Math.floor(difficulty*1.5);
      this.specialAttack = difficulty*3;
    } else {
      this.name = enemies[Math.floor(Math.random() * 6.9)];
      this.health = difficulty*5;
      this.basicAttack = difficulty;
      this.specialAttack = difficulty*2;
    }
  }
}
