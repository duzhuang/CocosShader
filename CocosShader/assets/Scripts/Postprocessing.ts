const { ccclass, property } = cc._decorator;

@ccclass
export default class Postprocessing extends cc.Component {

    @property({ type: cc.Camera, tooltip: '' })
    renderCamera: cc.Camera = null;

    @property({ type: cc.Sprite, tooltip: '' })
    renderSprite: cc.Sprite = null;

    private m_renderTexture: cc.RenderTexture = null;
    protected start(): void {
        this.m_renderTexture = new cc.RenderTexture();
        this.m_renderTexture.initWithSize(cc.winSize.width, cc.winSize.height);
        this.renderCamera.targetTexture = this.m_renderTexture;
    }

    protected update(dt: number): void {
        let sf = new cc.SpriteFrame();
        sf.setTexture(this.m_renderTexture);
        this.renderSprite.spriteFrame = sf;
    }
}
