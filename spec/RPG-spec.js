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
