/**
 * 方向模糊（Directional Blur）可以看做是径向模糊（Radial Blur）的一个变体。
 * 其主要思路是传入一个角度，然后在runtime层计算出对应的矢量方向：
 */
const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/Blur/DirectionalBlur')
@executeInEditMode
export default class DirectionalBlur extends cc.Component {

    @property()
    _directionalBlur = false;

    @property({ type: cc.Boolean })
    set directionalBlur(value: boolean) {
        this._directionalBlur = value;
        this.setDirectionalBlur();
    }
    get directionalBlur(): boolean {
        return this._directionalBlur;
    }

    @property()
    _blurRadius = 0.01;
    @property({ type: cc.Float, visible() { return this.directionalBlur; } })
    set blurRadius(value: number) {
        this._blurRadius = value;
        this.setRadius();
    }
    get blurRadius() {
        return this._blurRadius;
    }

    @property()
    _blueAngle = 0;
    @property({ type: cc.Float, visible() { return this.directionalBlur; } })
    set blueAngle(value: number) {
        this._blueAngle = value;
        this.setAngle();
    }
    get blueAngle() {
        return this._blueAngle;
    }

    private m_sprite: cc.Sprite = null;
    private m_material: cc.Material = null;

    protected start(): void {
        this.m_sprite = this.node.getComponent(cc.Sprite)!;
        this.m_material = this.m_sprite.getMaterial(0)!;
        this.showWarn();
        this.setDirectionalBlur();
        this.setRadius();
        this.setAngle();
    }

    showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "directionalBlur_material") {
            cc.error("节点：", this.name, "材质的名字不是", "directionalBlur_material");
            return;
        }
    }

    setDirectionalBlur() {
        this.m_material.define("USER_DIRECTIONAL", this.directionalBlur, 0);
    }

    setRadius() {
        this.m_material.setProperty("blurRadius", this.blurRadius);
    }

    setAngle() {
        this.m_material.setProperty("blueAngle", this.blueAngle);
    }

}
