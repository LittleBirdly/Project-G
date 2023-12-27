import { _decorator, Component, Animation, KeyCode, log, Node, Vec2, Vec3, RigidBody, 
    RigidBody2D, EventKeyboard, Contact2DType, input, Input, math, Collider2D } from 'cc';
import{ RoleStateEnum, stateMachine } from './RoleStateEnum'; 
const { ccclass, property } = _decorator;

@ccclass('RoleController')
export class RoleController extends Component {

    animation: Animation | null = null;

    private _hp: number = 50;
    private _mp: number = 50;
    private _attack: number = 5;
    private _defence: number = 3;
    private _state: RoleStateEnum;
    private _curTime:number = 0;
    private _runStep:number = 10;
    private _runTime:number = 0;
    private _runSpeed:number;
    private _runSpeedVec2:Vec2;
    private _roleLvVec2:Vec2 = new Vec2(0,0);
    private _curPosition:Vec3 = new Vec3();
    private _targetPosition:Vec3 = new Vec3();
    private _deltaPosition:Vec3 = new Vec3(0, 0, 0);
    private inputStore = {};
    private _jumpSpeed;
    private _jumpFlag;


    onLoad() {
        log('Load Role Property');
        this._state = RoleStateEnum.Idle;
        this._runSpeed = 10;
        this._runSpeedVec2 = new Vec2(0,0);
        this._jumpSpeed = 20;
        this._jumpFlag = true;

        log('Load Role Event');
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        for(let roleCollider2D of this.node.getComponents(Collider2D)) {
            if(roleCollider2D.tag == 0) {
                roleCollider2D.on(Contact2DType.BEGIN_CONTACT, () => {
                    this._jumpFlag = true;
                    this.idle();
                }, this);
            }
        }

    }

    onDestroy() {
        log('Destroy Role Event');
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {
        this.animation = this.getComponent(Animation);
    }

    update(deltaTime: number) {

        let scaleV : Vec3 = this.node.scale;
        scaleV.x = Math.abs(scaleV.x);

        this._roleLvVec2 = this.node.getComponent(RigidBody2D).linearVelocity;
        this.node.getComponent(RigidBody2D).linearDamping = 5;

        if(this.inputStore[KeyCode.ALT_LEFT] && this._jumpFlag) {
            this._jumpFlag = false;
            this._roleLvVec2.y = this._jumpSpeed;
            this.jump();
        } else if(this.inputStore[KeyCode.ARROW_LEFT]) {
            this._runSpeedVec2.x = -1;
            scaleV.x = -scaleV.x;
            this.run()
        } else if(this.inputStore[KeyCode.ARROW_RIGHT]) {
            this._runSpeedVec2.x = 1;
            this.run()
        } else {
            this._runSpeedVec2.x = 0;
            if(this._roleLvVec2.y < 0) {
                this.fall();
            } else {
                this.idle();
            }
        }

        this.node.setScale(scaleV);

        this._roleLvVec2.x = this._runSpeedVec2.x * this._runSpeed;

        this.node.getComponent(RigidBody2D).linearVelocity = this._roleLvVec2

        // log("Current Position: ", this.node.worldPosition);
        // log("Current linearVelocity: ", this._roleLvVec2, this.node.getComponent(RigidBody2D).angularVelocity);

        // this._curTime += deltaTime; 
        // if (this._curTime > this._runTime) { 
        //     // end 
        //     this.node.setPosition(this._targetPosition);             
        // } else {
        //     this._curPosition = this.node.getPosition(); 
        //     this._deltaPosition.x = this._runSpeed * deltaTime * this.node.scale.x; //每一帧根据速度和时间计算位移
        //     Vec3.add(this._curPosition, this._curPosition, this._deltaPosition); // 应用这个位移
        //     this.node.setPosition(this._curPosition); // 将位移设置给角色
        // }
    }

    onKeyDown(event: EventKeyboard) {

        log('Input KeyDown:' + event.keyCode);
        this.inputStore[event.keyCode] = 1;

    }

    onKeyUp(event: EventKeyboard) {
        log('Input KeyUp:' + event.keyCode);
        this.inputStore[event.keyCode] = 0;
    }

    changeState(destinationState: RoleStateEnum) : boolean {
        if(destinationState == this._state) {
            return true;
        }

        if(stateMachine[this._state]['exclude'] && 
            (stateMachine[this._state]['exclude']['all'] || stateMachine[this._state]['exclude'][destinationState] )) {
            log(this._state +'无法转换成:'+ destinationState);

            return false;
        }

        log(this._state +'转换成:'+ destinationState);
        this._state = destinationState;

        this.animation.crossFade(destinationState, 0.1);


        return true;

    }
    
    idle() {
        if(!this.changeState(RoleStateEnum.Idle)) return;
    }

    attack() {
        if(!this.changeState(RoleStateEnum.Attack)) return;
    }

    hurt() {
        if(!this.changeState(RoleStateEnum.Hurt)) return;
    }

    run() {
        if(!this.changeState(RoleStateEnum.Run)) return;


        // this._curTime = 0;
        // this._runTime = this.animation.getState(RoleStateEnum.Run).duration;
        // this._runSpeed = this._runStep / this._runTime;
        // this._curPosition = this.node.getPosition();
        // Vec3.add(this._targetPosition, this._curPosition, new Vec3(this._runStep * this.node.scale.x, 0, 0));
    }
    jump() {
        if(!this.changeState(RoleStateEnum.Jump)) return;

        // this._curTime = 0;
        // this._runTime = this.animation.getState(RoleStateEnum.Jump).duration;
        // this._runSpeed = this._runStep / this._runTime;
        // this._curPosition = this.node.getPosition();
        // Vec3.add(this._targetPosition, this._curPosition, new Vec3(this._runStep * this.node.scale.x, 0, 0));
    }
    fall() {
        if(!this.changeState(RoleStateEnum.Fall)) return;
    }
    die() {
        if(!this.changeState(RoleStateEnum.Die)) return;
    }
}


