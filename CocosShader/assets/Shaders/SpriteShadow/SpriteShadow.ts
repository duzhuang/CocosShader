/**
 * setProperty 中使用三个参数，最后一个参数是指定 pass 通道的。
 * 如果不指定通道，则所有的通道都会设置 对应的参数，但是第二个通道无相关参数，会报错
 */

const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/SpriteShadow')
@executeInEditMode
export default class NewClass extends cc.Component {
    @property()
    _offsetX = 0.1;
    @property({ type: cc.Float, range: [-1.0, 1.0] })
    set offsetX(value) {
        this._offsetX = value;
        this.setOffsetX();
    }
    get offsetX() {
        return this._offsetX;
    }

    @property()
    _offsetY = 0.1;
    @property({ type: cc.Float, range: [-1.0, 1.0] })
    set offsetY(value) {
        this._offsetY = value;
        this.setOffsetY();
    }
    get offsetY() {
        return this._offsetY;
    }

    private m_sprite: cc.Sprite = null!;
    private m_spine: sp.Skeleton = null!;
    private m_label: cc.Label = null!;
    private m_material: cc.Material = null!;

    protected start(): void {
        this.m_sprite = this.getComponent(cc.Sprite)!;
        if (this.m_sprite) {
            this.m_material = this.m_sprite.getMaterial(0)!;
            this.showWarn();
        }

        this.m_spine = this.getComponent(sp.Skeleton)!;
        if (this.m_spine) {
            this.m_material = this.m_spine.getMaterial(0)!;
            this.showWarn();
        }

        this.m_label = this.getComponent(cc.Label)!;
        if (this.m_label) {
            this.m_material = this.m_label.getMaterial(0)!;
            this.showWarn();
        }

        this.setOffsetX();
        this.setOffsetY();
    }

    private showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "spriteShadow_material") {
            cc.error("节点：", this.name, "材质的名字不是water_shader");
            return;
        }
    }

    private setOffsetX() {
        if (typeof (this.offsetX) !== "undefined") {
            this.m_material.setProperty("offsetX", this.offsetX, 0);
        }
    }

    private setOffsetY() {
        if (typeof (this.offsetY) !== "undefined") {
            this.m_material.setProperty("offsetY", this.offsetY, 0);
        }
    }
}
