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
    this.inventory = ["stick", "stone"];
    this.experience = 0;
    this.level = 1;
    this.difficulty = 0;
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

  levelUp(level, experience) {
    const expCap = level*100;
    if(experience >= expCap && level < 50) {
      this.level++;
      this.health += 10;
      this.stamina += 10;
      this.radiation += 10;
    }
  }

  encounter(difficulty) {
    const enemy = new Enemy(difficulty);
    const encounterMessage = `You have encountered a ${enemy.name}`;
    let result = [enemy, encounterMessage];
    return (result);
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
      this.basicAttack = Math.floor(difficulty/2);
      this.specialAttack = difficulty;
    }
  }
}
