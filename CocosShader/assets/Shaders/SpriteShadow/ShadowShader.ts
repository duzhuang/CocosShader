/**
 * setProperty 中使用三个参数，最后一个参数是指定 pass 通道的。
 * 如果不指定通道，则所有的通道都会设置 对应的参数，但是第二个通道无相关参数，会报错
 */

const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/ShadowShader')
@executeInEditMode
export default class ShadowShader extends cc.Component {
    @property()
    _offsetX = 0.1;
    @property({ type: cc.Float })
    set offsetX(value) {
        this._offsetX = value;
        this.setOffsetX();
    }
    get offsetX() {
        return this._offsetX;
    }

    @property()
    _offsetY = 0.1;
    @property({ type: cc.Float })
    set offsetY(value) {
        this._offsetY = value;
        this.setOffsetY();
    }
    get offsetY() {
        return this._offsetY;
    }

    @property()
    _scale = 1;
    @property({ type: cc.Float })
    set scale(value) {
        this._scale = value;
        this.setScale();
    }
    get scale() {
        return this._scale;
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
        if (String(this.m_material.material._name) !== "shadowShader_material") {
            cc.error("节点：", this.name, "材质的名字不是water_shader");
            return;
        }
    }

    private setOffsetX() {
        this.m_material.setProperty("offsetX", this.offsetX, 0);
    }

    private setOffsetY() {
        this.m_material.setProperty("offsetY", this.offsetY, 0);
    }

    private setScale() {
        this.m_material.setProperty("scale", this.scale, 0);
    }
}
