const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/LinearTransition')
@executeInEditMode
export default class LinearTransition extends cc.Component {

    @property()
    _tranSize = 0.1;
    @property({ type: cc.Float ,range:[0,1]})
    set tranSize(value) {
        this._tranSize = value;
        this.setTranSize();
    }
    get tranSize() {
        return this._tranSize;
    }

    @property({ type: cc.Texture2D })
    subTexture: cc.Texture2D = null;

    private m_sprite: cc.Sprite = null!;
    private m_material: cc.Material = null!;

    protected start(): void {
        this.m_sprite = this.getComponent(cc.Sprite)!;
        this.m_material = this.m_sprite.getMaterial(0)!;
        this.showWarn();
        this.setTranSize();
        this.setSubTexture();
    }

    showWarn(){
        //@ts-ignore
        if (String(this.m_material.material._name)!== "linearTransition_material") {
            cc.error("节点：", this.name, "材质的名字不是linearTransition_material");
            return;
        }
    }

    setTranSize(){
        this.m_material.setProperty('tranSize', this.tranSize);
    }

    setSubTexture(){
        this.m_material.setProperty('subTexture', this.subTexture);
    }

}
