const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/UVSample')
@executeInEditMode
export default class UVSample extends cc.Component {

    @property
    _uvPos = cc.v2(0, 0);

    @property({ type: cc.Vec2 })
    set uvPos(value) {
        this._uvPos = value;
        this.setUVPos();
    }
    get uvPos() {
        return this._uvPos;
    }

    @property
    _uvStepSize = cc.v2(0, 0);

    @property({ type: cc.Vec2 })
    set uvStepSize(value) {
        this._uvStepSize = value;
        this.setUVStepSize();
    }
    get uvStepSize() {
        return this._uvStepSize;
    }


    private m_sprite: cc.Sprite = null!;
    private m_material: cc.Material = null!;

    protected start(): void {
        this.m_sprite = this.getComponent(cc.Sprite);
        this.m_material = this.m_sprite.getMaterial(0);
        this.showWarn();
        this.setUVPos();
        this.setUVStepSize();
    }

    private showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "uvSample_material") {
            cc.error("节点：", this.name, "材质的名字不是", "uvSample_material");
            return;
        }
    }

    private setUVPos() {
        this.m_material.setProperty("uvPos", this.uvPos, 0);
    }

    private setUVStepSize() {
        this.m_material.setProperty("uvStepSize", this.uvStepSize, 0);
    }
}
