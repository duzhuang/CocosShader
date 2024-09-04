const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/CircleTransition')
@executeInEditMode
export default class CircleTransition extends cc.Component {
    @property()
    _speed = 1;
    @property({ type: cc.Float, min: 0.1 })
    set speed(value) {
        this._speed = value;
        this.setSpeed();
    }
    get speed() {
        return this._speed;
    }

    @property({ type: cc.Texture2D })
    subTexture: cc.Texture2D = null;

    private m_sprite: cc.Sprite = null!;
    private m_material: cc.Material = null!;

    protected start(): void {
        this.m_sprite = this.getComponent(cc.Sprite)!;
        this.m_material = this.m_sprite.getMaterial(0)!;
        this.showWarn();
        this.setSpeed();
        this.setSubTexture();
    }

    showWarn(){
        //@ts-ignore
        if (String(this.m_material.material._name)!== "circleTransition_material") {
            cc.error("节点：", this.name, "材质的名字不是circleTransition_material");
            return;
        }
    }

    setSpeed(){
        this.m_material.setProperty('speed', this.speed);
    }

    setSubTexture(){
        this.m_material.setProperty('subTexture', this.subTexture);
    }
}
