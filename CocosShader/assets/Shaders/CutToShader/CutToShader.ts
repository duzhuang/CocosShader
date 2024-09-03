const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/CutToShader')
@executeInEditMode
export default class CutToShader extends cc.Component {

    @property
    _direction = 0;

    @property({ type: cc.Float, tooltip: "0 竖向  1 横向" })
    set direction(value) {
        this._direction = value;
        this.setDirection();
    }
    get direction() {
        return this._direction;
    }

    @property
    _speed = 1;

    @property({ type: cc.Float, min: 0.1 })
    set speed(value) {
        this._speed = value;
        this.setSpeed();
    }
    get speed() {
        return this._speed;
    }

    private m_sprite: cc.Sprite = null!;
    private m_material: cc.Material = null!;

    protected start(): void {
        this.m_sprite = this.getComponent(cc.Sprite);
        this.m_material = this.m_sprite.getMaterial(0);
        this.showWarn();
        this.setDirection();
        this.setSpeed();
    }

    private showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "cutToShader_material") {
            cc.error("节点：", this.name, "材质的名字不是", "cutToShader_material");
            return;
        }
    }

    setDirection() {
        this.m_material.setProperty("direction", this.direction, 0);
    }

    setSpeed() {
        this.m_material.setProperty("speed", this.speed, 0);
    }
}