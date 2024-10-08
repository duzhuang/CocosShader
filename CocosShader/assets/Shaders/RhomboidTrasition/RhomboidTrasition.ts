const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu("Shaders/2D/RhomboidTrasition")
@executeInEditMode
export default class RhomboidTrasition extends cc.Component {

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

    @property
    _cellSize = 32;

    @property({ type: cc.Integer, min: 1 })
    set cellSize(value) {
        this._cellSize = value;
        this.setCellSize();
    }
    get cellSize() {
        return this._cellSize;
    }

    @property({ type: cc.Texture2D })
    subTexture: cc.Texture2D = null;

    private m_sprite: cc.Sprite = null!;
    private m_material: cc.Material = null!;

    protected start(): void {
        this.m_sprite = this.getComponent(cc.Sprite)!;
        this.m_material = this.m_sprite.getMaterial(0)!;
        this.showWarn();
        this.setSpeed();
        this.setCellSize();
        this.setSubTexture();
    }

    showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "rhomboidTransition_material") {
            cc.error("节点：", this.name, "材质的名字不是rhomboidTransition_material");
            return;
        }
    }

    setSpeed() {
        this.m_material.setProperty('speed', this.speed);
    }

    setSubTexture() {
        this.m_material.setProperty('subTexture', this.subTexture);
    }

    setCellSize(){
        this.m_material.setProperty('cellSize', this.cellSize);
    }
}
