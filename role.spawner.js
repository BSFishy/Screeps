var roleSpawner = {
    /** @param {StructureSpawn} spawn **/
    run: function(spawn) {
        if(spawn.energy >= 200){
            var i = 1;
            while (spawn.canCreateCreep([WORK, CARRY, MOVE], 'Worker' + i) == ERR_NAME_EXISTS) {
                i++;
            }
            
            spawn.createCreep([WORK, CARRY, MOVE], 'Worker' + i);
        }
    }
};

module.exports = roleSpawner;