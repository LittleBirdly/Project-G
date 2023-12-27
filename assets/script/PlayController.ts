import { _decorator, Component, Node, Vec3, EventMouse, input, Input, Animation, EventKeyboard, KeyCode, log } from 'cc';
import { RoleController } from './RoleController';
const { ccclass, property, requireComponent} = _decorator;

export const BLOCK_SIZE = 40

@ccclass('PlayController')
export class PlayController extends Component {
    
    
    private _roleController: RoleController | null = null;

    private _startJump: boolean = false;
    private _jumpStep: number = 0;
    private _curJumpTime: number = 0;
    private _jumpTime: number = 0.1;
    private _curJumpSpeed: number = 0;
    private _curPos: Vec3 = new Vec3();
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    private _targetPos: Vec3 = new Vec3();

    start() {
        log('控制器初始化');
        this._roleController = this.node.getComponent(RoleController);
    }

    update(deltaTime: number) {
        // if (this._startJump) {
        //     this._curJumpTime += deltaTime; // 累计总的跳跃时间
        //     if (this._curJumpTime > this._jumpTime) { // 当跳跃时间是否结束
        //         // end 
        //         this.node.setPosition(this._targetPos); // 强制位置到终点
        //         this._startJump = false;               // 清理跳跃标记
        //     } else {
        //         // tween
        //         this.node.getPosition(this._curPos); 
        //         this._deltaPos.x = this._curJumpSpeed * deltaTime; //每一帧根据速度和时间计算位移
        //         Vec3.add(this._curPos, this._curPos, this._deltaPos); // 应用这个位移
        //         this.node.setPosition(this._curPos); // 将位移设置给角色
        //     }
        // }
    }

    onMouseUp(event: EventMouse) {
        if (event.getButton() === 0) {
            this.jumpByStep(1);
        } else if (event.getButton() === 2) {
            this.jumpByStep(2);
        }
    }

    jumpByStep(step: number) {
        // if (this._startJump) {
        //     return;
        // }
        // this._startJump = true;  // 标记开始跳跃
        // this._jumpStep = step; // 跳跃的步数 1 或者 2

        // const clipName = step == 1 ? 'run' : 'twoStep';
        // const state = this.BodyAnim.getState(clipName);
        // this._jumpTime = state.duration;

        // this._curJumpTime = 0; // 重置开始跳跃的时间
        // this._curJumpSpeed = this._jumpStep * BLOCK_SIZE / this._jumpTime; // 根据时间计算出速度
        // this.node.getPosition(this._curPos); // 获取角色当前的位置
        // Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep * BLOCK_SIZE, 0, 0));    // 计算出目标位置
        
        // if (this.BodyAnim) {
        //     if (step === 1) {
        //         this.BodyAnim.play('run');
        //     } else if (step === 2) {
        //         this.BodyAnim.play('twoStep');
        //     }
        // }
    }
}


