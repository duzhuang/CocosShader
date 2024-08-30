const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/GrayShader')
@executeInEditMode
export default class GrayShader extends cc.Component {   

    @property()
    _gray = false;
    @property({ type: cc.Boolean })
    set gray(value) {
        this._gray = value;
        this.setGray();
    }
    get gray() {
        return this._gray;
    }

    @property()
    _grayScaleAmount = 1.0;
    @property({ type: cc.Float })
    set grayScaleAmount(value) {
        this._grayScaleAmount = value;
        this.setGrayScaleAmount();
    }
    get grayScaleAmount() {
        return this._grayScaleAmount;
    }

    private m_sprite: cc.Sprite = null!;
    private m_material: cc.Material = null!;

    protected onLoad(): void {
        this.m_sprite = this.getComponent(cc.Sprite)!;
        this.m_material = this.m_sprite.getMaterial(0)!;
        this.showWarn();
        this.setGray();
        this.setGrayScaleAmount();
    }

    private showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "grayShader_material") {
            cc.error("节点：", this.name, "材质的名字不是grayShader_material");
            return;
        }
    }


    public setGray() {
        let isGray: number = 0;
        if (this.gray) {
            isGray = 1.0;
        } else {
            isGray = 0.0;
        }
        this.m_material.setProperty('isGray', isGray);
    }

    public setGrayScaleAmount() {
        this.m_material.setProperty('grayScaleAmount', this.grayScaleAmount);
    }
}
