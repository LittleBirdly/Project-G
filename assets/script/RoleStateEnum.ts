 export enum RoleStateEnum {
    
    Idle = "idle",
    Attack = "attack",
    Attack2 = "attack2",
    Attack3 = "attack3",
    Hurt = "hurt",
    Run = "run",
    Jump = "jump",
    Fall = "fall",
    Die = "die"
}

export enum PhysicGroupEnum {
    
    DEFAULT = 1 << 0,
    PLAYER = 1 << 1,
    WALL = 1 << 2
}

export var stateMachine = {
    idle : {
        
    },
    attack: {
        
    },
    attack2: {

    },
    attack3: {

    },
    hurt: {

    },
    run: {
        
    },
    jump: {
    
    },
    fall: {
    
    },
    die: {
        exclude: {all:true}
    }
    
}
