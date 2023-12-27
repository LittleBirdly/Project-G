import { _decorator, BoxCollider2D, Component, log, Node, ERigidBody2DType , TiledMap, Vec2, PhysicsSystem2D, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;
import{ PhysicGroupEnum} from './RoleStateEnum'; 

@ccclass('BackgroundController')
export class BackgroundController extends Component {
    onLoad() {

        log('Physics System Initialize');
        let instance = PhysicsSystem2D.instance;
        instance.enable = true;
        instance.debugDrawFlags = 1;
        instance.gravity = new Vec2(0, -800);
    }

    start() {
        log('Map Initialize');
        let tiledMap = this.getComponent(TiledMap)
        let tileSize = tiledMap.getTileSize();
        let wallLayer = tiledMap.getLayer('wall');
        let wallLayerSize = wallLayer.getLayerSize();

        for(let x = 0; x < wallLayerSize.width; x++) {
            for(let y = 0; y < wallLayerSize.height; y++) {
                let tile = wallLayer.getTiledTileAt(x, y, true); 
                
                if(tile.grid) {
                    tile.node.name = tile.grid + '';
                    let tileBody = tile.node.addComponent(RigidBody2D);
                    tileBody.type = ERigidBody2DType.Static;
                    tileBody.group = PhysicGroupEnum.WALL;
                    let colider = tile.node.addComponent(BoxCollider2D);
                    colider.group = PhysicGroupEnum.WALL;
                    colider.offset = new Vec2(tileSize.width/2, tileSize.height/2);
                    colider.size = tileSize;
                    colider.apply();
                }
            }
        }
    
    }

    update(deltaTime: number) {
        
    }
}


