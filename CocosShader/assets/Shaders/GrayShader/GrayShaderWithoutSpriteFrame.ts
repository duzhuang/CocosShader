
const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass('GrayShaderWithoutSpriteFrame')
@executeInEditMode
export default class GrayShaderWithoutSpriteFrame extends cc.Component {
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

    @property({ type: cc.Boolean, tooltip: '是否使用占位纹理解决合批问题' })
    usePlaceholder = true;

    /** 占位 SpriteFrame */
    private static m_placeholderSpriteFrame: cc.SpriteFrame = null!;
    /** 原始 SpriteFrame */
    private m_originalSpriteFrame: cc.SpriteFrame = null!;

    protected onLoad(): void {

        const spriteCom = this.node.getComponent(cc.Sprite);
        if (!spriteCom) {
            console.error("GrayShaderWithoutSpriteFrame: onLoad, spriteCom is null");
            return;
        }

        // 保存原始 SpriteFrame
        this.m_originalSpriteFrame = spriteCom.spriteFrame;

        // 创建占位纹理
        if (this.usePlaceholder && !this.m_originalSpriteFrame) {
            this.createPlaceholderSpriteFrame();
            this.applyPlaceholderIfNeeded();
        }

        this.setGray();
        this.setGrayScaleAmount();
    }

    protected start(): void {

    }

    /**
     * 创建占位 SpriteFrame
     */
    private createPlaceholderSpriteFrame() {
        if (GrayShaderWithoutSpriteFrame.m_placeholderSpriteFrame) return;
        const texture = new cc.Texture2D();
        const data = new Uint8Array(4); // RGBA
        data[0] = 0; // R
        data[1] = 0; // G
        data[2] = 0; // B
        data[3] = 0; // A (完全透明)

        // 创建 SpriteFrame
        texture.initWithData(data, cc.Texture2D.PixelFormat.RGBA8888, 1, 1);
        GrayShaderWithoutSpriteFrame.m_placeholderSpriteFrame = new cc.SpriteFrame();
        GrayShaderWithoutSpriteFrame.m_placeholderSpriteFrame.setTexture(texture);
    }

    private applyPlaceholderIfNeeded() {
        this.node.getComponent(cc.Sprite).spriteFrame = GrayShaderWithoutSpriteFrame.m_placeholderSpriteFrame;
    }

    private setGray() {
        const isGrayValue = this.gray ? 1.0 : 0.0;
        const material = this.node.getComponent(cc.Sprite).getMaterial(0);
        if (!material) {
            return;
        }
        //获取当前渲染组件的材质
        material.setProperty('isGray', isGrayValue);
    }

    private setGrayScaleAmount() {
        const material = this.node.getComponent(cc.Sprite).getMaterial(0);
        if (!material) {
            return;
        }
        material.setProperty('grayScaleAmount', this._grayScaleAmount);
    }
}