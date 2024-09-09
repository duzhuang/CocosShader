/**
 * 基于随机uv进行采样的抖动，以对粗粒度的模糊进行模拟。
 */

const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/Blur/GrainyBlur')
@executeInEditMode
export default class GrainyBlur extends cc.Component {

    @property()
    _grainyBlur = false;

    @property({ type: cc.Boolean })
    set grainyBlur(value: boolean) {
        this._grainyBlur = value;
        this.setGrainyBlur();
    }
    get grainyBlur(): boolean {
        return this._grainyBlur;
    }
      
    @property()
    _blurRadius = 0.01;

    @property({ type: cc.Float, visible() { return this.grainyBlur; } })
    set blurRadius(value: number) {
        this._blurRadius = value;
        this.setBlurRadius();
    }
    get blurRadius(): number {
        return this._blurRadius;
    }

    private m_sprite: cc.Sprite = null!;
    private m_material: cc.Material = null!;

    protected start(): void {
        this.m_sprite = this.getComponent(cc.Sprite)!;
        this.m_material = this.m_sprite.getMaterial(0)!;
        this.showWarn();
        this.setGrainyBlur();
        this.setBlurRadius();        
    }

    showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "grainyBlur_material") {
            cc.error("节点：", this.name, "材质的名字不是", "grainyBlur_material");
            return;
        }
    }    

    setGrainyBlur() {
        this.m_material.define("USE_GRAINYBLUR", this.grainyBlur, 0);
    }

    setBlurRadius() {
        this.m_material.setProperty("blurRadius", this.blurRadius);
    }
}
