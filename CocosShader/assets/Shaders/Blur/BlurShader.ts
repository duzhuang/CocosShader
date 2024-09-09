const { ccclass, property, executeInEditMode, menu } = cc._decorator;
@ccclass
@menu('Shaders/2D/BlurShader')
@executeInEditMode
export default class BlurShader extends cc.Component {

    @property()
    _blur: boolean = false;

    @property({ type: cc.Boolean })
    set blur(value: boolean) {
        this._blur = value;        
        this.setBlur();
    }
    get blur(): boolean {
        return this._blur;
    }

    @property()
    _uvoffset = 0.05;

    @property({ type: cc.Float, min: 0, max: 1, visible() { return this.blur; } })
    set uvoffset(value: number) {
        this._uvoffset = value;
        this.setuvOffset();
    }
    get uvoffset(): number {
        return this._uvoffset;
    }

    private m_sprite: cc.Sprite = null!;
    private m_material: cc.Material = null!;

    protected start(): void {
        this.m_sprite = this.getComponent(cc.Sprite)!;
        this.m_material = this.m_sprite.getMaterial(0)!;
        this.showWarn();
        this.setBlur();
        this.setuvOffset();
    }

    showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "blur_material") {
            cc.error("节点：", this.name, "材质的名字不是", "blur_material");
            return;
        }
    }

    setBlur() {
        this.m_material.define("USE_BLUR", this.blur, 0);
    }

    setuvOffset() {
        this.m_material.setProperty("uvoffset", this.uvoffset);
    }
}
