const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/UVShader')
@executeInEditMode
export default class UVShader extends cc.Component {
    @property()
    _uvRange = 0.5;

    @property({ type: cc.Float })
    set uvRange(value) {
        this._uvRange = value;
        this.setUVRange();
    }
    get uvRange() {
        return this._uvRange;
    }

    private m_sprite: cc.Sprite = null!;
    private m_material: cc.Material = null!;

    protected start(): void {
        this.m_sprite = this.getComponent(cc.Sprite);
        this.m_material = this.m_sprite.getMaterial(0);
        this.setUVRange();
    }


    private showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "uvShader_material") {
            cc.error("节点：", this.name, "材质的名字不是", "uvShader_material");
            return;
        }
    }

    private setUVRange() {
        this.m_material.setProperty("uvRange", this.uvRange, 0);
    }
}

