/**
 * 原理:，首先选取一个径向轴心（Radial Center），然后将每一个采样点的uv基于此径向轴心进行偏移（offset），
 * 并进行一定次数的迭代采样，最终将采样得到的RGB值累加，并除以迭代次数。
 */
const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/Blur/RadialBlur')
@executeInEditMode
export default class RadialBlur extends cc.Component {

    @property()
    _radialBlur = false;

    @property({ type: cc.Boolean })
    set radialBlur(value: boolean) {
        this._radialBlur = value;
        this.setRadialBlur();
    }
    get radialBlur(): boolean {
        return this._radialBlur;
    }

    @property()
    _radialCenter = new cc.Vec2(0.5, 0.5);

    @property({ type: cc.Vec2, visible() { return this.radialBlur } })
    set radialCenter(value: cc.Vec2) {
        this._radialCenter = value;
        this.setRadialCenter();
    }

    get radialCenter() {
        return this._radialCenter;
    }

    @property()
    _blurRadius = 0.01;

    @property({ type: cc.Float, visible() { return this.radialBlur; } })
    set blurRadius(value: number) {
        this._blurRadius = value;
        this.setRadius();
    }

    get blurRadius() {
        return this._blurRadius;
    }

    private m_sprite: cc.Sprite = null;
    private m_material: cc.Material = null;

    protected start(): void {
        this.m_sprite = this.node.getComponent(cc.Sprite)!;
        this.m_material = this.m_sprite.getMaterial(0)!;
        this.showWarn();
        this.setRadialBlur();
        this.setRadialCenter();
        this.setRadius();
    }

    showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "radialBlur_material") {
            cc.error("节点：", this.name, "材质的名字不是", "radialBlur_material");
            return;
        }
    }

    setRadialBlur() {
        this.m_material.define("USE_RADIALBLUR", this.radialBlur, 0);
    }

    setRadialCenter() {
        this.m_material.setProperty('radialCenter', this.radialCenter);
    }

    setRadius() {
        this.m_material.setProperty('blurRadius', this.blurRadius);
    }

}
