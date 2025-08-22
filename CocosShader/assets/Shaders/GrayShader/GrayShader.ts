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

    protected onLoad(): void {
        this.setGray();
        this.setGrayScaleAmount();
    }

    private setGray() {
        const isGrayValue = this.gray ? 1.0 : 0.0;
        const currentMaterial = this.node.getComponent(cc.Sprite).getMaterial(0);
        //获取当前渲染组件的材质
        currentMaterial.setProperty('isGray', isGrayValue);
    }

    private setGrayScaleAmount() {
        const currentMaterial = this.node.getComponent(cc.Sprite).getMaterial(0);
        currentMaterial.setProperty('grayScaleAmount', this.grayScaleAmount);
    }

}
