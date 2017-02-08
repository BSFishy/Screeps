function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.status == undefined) {
	        creep.memory.status = 1;
	    }
	    
	    if (creep.memory.status == 1) {
            var sources = creep.room.find(FIND_SOURCES);
            
	        if (creep.memory.source == undefined) {
	            var len = Object.keys(sources).length;
	            creep.memory.source = getRandomIntInclusive(0, (len - 1));
	            console.log('new source is ' + creep.memory.source);
	        }
            var source = sources[Object.keys(sources)[creep.memory.source]];
	        
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            
            if(creep.carry.energy >= creep.carryCapacity) {
                creep.memory.status = getRandomIntInclusive(2, 5);
            }
	    } else if (creep.memory.status == 2) {
	        var found = false;
	        for (var i in Game.spawns) {
	            var spawn = Game.spawns[i];
	            if (spawn.energy < spawn.energyCapacity) {
	                found = true;
	                break;
	            }
	        }
	        
	        if (found) {
	            if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                }
	        } else {
	            creep.memory.status = 1;
	            creep.memory.source = undefined;
	        }
	        
	        if (creep.carry.energy <= 0) {
	            creep.memory.status = 1;
	            creep.memory.source = undefined;
	        }
	    } else if (creep.memory.status == 3) {
	        var control = creep.room.controller;
	        
	        if(creep.transfer(control, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	            creep.moveTo(control);
	        }
	        
	        if (creep.carry.energy <= 0) {
	            creep.memory.status = 1;
	            creep.memory.source = undefined;
	        }
	    } else if (creep.memory.status == 4) {
	        var site = undefined;
	        for (var i in Game.constructionSites) {
	            site = Game.constructionSites[i];
	            break;
	        }
	        
	        if (site == undefined) {
	            creep.memory.status = 1;
	            creep.memory.source = undefined;
	        }
	        
	        if (creep.build(site) == ERR_NOT_IN_RANGE) {
	            creep.moveTo(site);
	        }
	        
	        if (creep.carry.energy <= 0) {
	            creep.memory.status = 1;
	            creep.memory.source = undefined;
	        }
	    } else if (creep.memory.status == 5) {
	        var site = creep.room.storage;
	        if (site == undefined) {
	            creep.memory.status = 1;
	            creep.memory.source = undefined;
	        }
	        
	        if (creep.transfer(site, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	            creep.moveTo(site);
	        }
	        
	        if (creep.carry.energy <= 0) {
	            creep.memory.status = 1;
	            creep.memory.source = undefined;
	        }
	    }
	}
};

module.exports = roleHarvester;