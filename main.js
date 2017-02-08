var harvestor = require('role.harvestor');
var spawn = require('role.spawner');

for(var i in Game.creeps) {
    harvestor.run(Game.creeps[i]);
}

for(var i in Game.spawns) {
    spawn.run(Game.spawns[i]);
}