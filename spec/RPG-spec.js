import { Player } from './../js/RPG.js';

describe('levelUp', function() {
  it('should not level up if experience does not meet threshold.', function() {
    const player = new Player("Embrossia");
    var level1 = player.levelUp(player.level, player.experience);
    expect(player.level).toEqual(1);
  });
});
describe('levelUp', function() {
  it('should level up if experience does not meet threshold.', function() {
    const player = new Player("Embrossia");
    player.experience = 100;
    var level1 = player.levelUp(player.level, player.experience);
    expect(player.level).toEqual(2);
  });
});
describe('typeChooser', function() {
  it('should select the correct class for player', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.typeChooser();
    expect(player.type).toEqual("Irradiated Gladior");
  });
});
describe('encounter', function() {
  it('Encounters a Boss', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.encounter(40);
    expect(player.currentEnemy[0].name).toEqual("Centaur");
  });
});
describe('encounter', function() {
  it('Encounters a basic enemy at random', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.encounter(49);
    let enemy = player.currentEnemy[0].name;
    expect(enemy).not.toEqual(undefined);
  });
});
describe('fight', function() {
  it('select attack successfully', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.typeChooser();
    player.encounter(player.difficulty);
    player.fight("Attack");
    expect(player.currentEnemy[0].health).toEqual(3);
  });
});
describe('fight', function() {
  it('select not attack successfully', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.encounter(1);
    player.stamina = 0;
    expect(player.fight("Attack")).toEqual("not a valid move");
  });
});
describe('win', function() {
  it('should win a fight', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.typeChooser();
    player.encounter(2);
    player.currentEnemy[0].health = 1;
    player.fight("Attack");
    expect(player.experience).toEqual(10);
  });
});
describe('special', function() {
  it('should do double damage', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.typeChooser();
    player.encounter(1);
    player.specialAttackTimer = 100;
    player.fight("Special Attack");
    expect(player.currentEnemy[0].health).toEqual(1);
  });
});
describe('inventory', function() {
  it('should heal player fully', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.typeChooser();
    player.encounter(player.difficulty);
    player.health = 80;
    player.inventory = 1;
    player.fight("Item");
    expect(player.health).toEqual(100);
  });
});
describe('inventory', function() {
  it('should heal player partially', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.typeChooser();
    player.encounter(player.difficulty);
    player.health = 70;
    player.inventory = 1;
    player.fight("Item");
    expect(player.health).toEqual(90);
  });
});
describe('inventory', function() {
  it('should not heal the player', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.typeChooser();
    player.encounter(1);
    player.health = 70;
    player.fight("Item");
    expect(player.health).toEqual(70);
  });
});
describe('all', function() {
  it('should simulate whole fight', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.typeChooser();
    player.encounter(1);
    player.specialAttackTimer = 100;
    player.fight("Special Attack");
    player.inventory = 1;
    player.fight("Item");
    expect(player.health).toEqual(100);
    let result = player.fight("Attack");
    expect(result).not.toEqual("not a valid move");
  });
});
describe('fight', function() {
  it('should simulate enemy dying and new enemy appearing', function() {
    const player = new Player("Embrossia", "Irradiated Gladior");
    player.typeChooser();
    player.encounter(1);
    player.specialAttackTimer = 100;
    player.fight("Special Attack");
    player.specialAttackTimer = 100;
    player.fight("Special Attack");
    alert(player.currentEnemy);
    expect(player.currentEnemy).not.toEqual([]);
  });
});
