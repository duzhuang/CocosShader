const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/UVShader')
@executeInEditMode
export default class UVShader extends cc.Component {
    @property()
    _uvRangeH = 0.5;

    @property({ type: cc.Float })
    set uvRangeH(value) {
        this._uvRangeH = value;
        this.setUVRangeH();
    }
    get uvRangeH() {
        return this._uvRangeH;
    }

    @property()
    _uvRangeV = 0.5;

    @property({ type: cc.Float })
    set uvRangeV(value) {
        this._uvRangeV = value;
        this.setUVRangeV();
    }
    get uvRangeV() {
        return this._uvRangeV;
    }

    private m_sprite: cc.Sprite = null!;
    private m_material: cc.Material = null!;

    protected start(): void {
        this.m_sprite = this.getComponent(cc.Sprite);
        this.m_material = this.m_sprite.getMaterial(0);
        this.showWarn();
        this.setUVRangeH();
        this.setUVRangeV();
    }


    private showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "uvShader_material") {
            cc.error("节点：", this.name, "材质的名字不是", "uvShader_material");
            return;
        }
    }

    private setUVRangeH() {
        this.m_material.setProperty("uvRangeH", this.uvRangeH, 0);
    }

    private setUVRangeV() {
        this.m_material.setProperty("uvRangeV", this.uvRangeV, 0);
    }
}

