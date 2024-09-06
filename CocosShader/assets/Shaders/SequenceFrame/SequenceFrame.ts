/**
 * set wrap mode is repeat
 */
const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu("Shaders/2D/SequenceFrame")
@executeInEditMode
export default class SequenceFrame extends cc.Component {

    @property()
    _hAmount: number = 1;
    @property({ type: cc.Integer, min: 1 })
    set hAmount(value: number) {
        this._hAmount = value;
        this.setHAmount();
    }
    get hAmount(): number {
        return this._hAmount;
    }

    @property()
    _vAmount: number = 1;
    @property({ type: cc.Integer, min: 1 })
    set vAmount(value: number) {
        this._vAmount = value;
        this.setVAmount();
    }
    get vAmount(): number {
        return this._vAmount;
    }

    @property()
    _speed: number = 1;
    @property({ type: cc.Float, min: 0 })
    set speed(value: number) {
        this._speed = value;
        this.setSpeed();
    }
    get speed(): number {
        return this._speed;
    }   

    private m_sprite: cc.Sprite = null!;
    private m_material: cc.Material = null!;

    protected start(): void {
        this.m_sprite = this.getComponent(cc.Sprite)!;
        this.m_material = this.m_sprite.getMaterial(0)!;
        this.showWarn();
        this.setSpeed();
        this.setHAmount();
        this.setVAmount();        
    }

    showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "sequenceFrame_material") {
            cc.error("节点：", this.name, "材质的名字不是sequenceFrame_material");
            return;
        }
    }

    setSpeed() {
        this.m_material.setProperty('speed', this.speed);
    }

    setHAmount() {
        this.m_material.setProperty('hAmount', this.hAmount);
    }

    setVAmount() {
        this.m_material.setProperty('vAmount', this.vAmount);
    }
}
