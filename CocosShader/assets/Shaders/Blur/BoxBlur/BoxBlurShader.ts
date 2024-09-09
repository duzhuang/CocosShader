

const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@menu('Shaders/2D/Blur/BoxBlur')
@executeInEditMode
export default class BoxBlurShader extends cc.Component {

    @property()
    _boxBlur: boolean = false;

    @property({ type: cc.Boolean })
    set boxBlur(value: boolean) {
        this._boxBlur = value;
        this.setBoxBlur();
    }
    get boxBlur(): boolean {
        return this._boxBlur;
    }

    @property()
    _blurOffset = new cc.Vec2(0.05, 0.05);

    @property({ type: cc.Vec2, visible() { return this.boxBlur } })
    set blurOffset(value: cc.Vec2) {
        this._blurOffset = value;
        this.setUvOffset();
    }

    get blurOffset() {
        return this._blurOffset;
    }

    @property()
    _repeatTimes = 1;

    @property({ type: cc.Integer, visible() { return this.boxBlur } })
    set repeatTimes(value: number) {
        this._repeatTimes = value;
        this.setRepeatTimes();
    }
    get repeatTimes() {
        return this._repeatTimes;
    }

    private m_sprite: cc.Sprite = null;
    private m_material: cc.Material = null;

    protected start(): void {
        this.m_sprite = this.node.getComponent(cc.Sprite);
        this.m_material = this.m_sprite.getMaterial(0);
        this.showWarn();
        this.setUvOffset();
        this.setBoxBlur();
    }

    showWarn() {
        //@ts-ignore
        if (String(this.m_material.material._name) !== "boxBlur_material") {
            cc.error("节点：", this.name, "材质的名字不是", "boxBlur_material");
            return;
        }
    }

    setBoxBlur() {
        this.m_material.define("USE_BOXBLUR", this._boxBlur, 0);
    }

    setUvOffset() {
        this.m_material.setProperty('blurOffset', this._blurOffset);
    }

    setRepeatTimes(){
        
    }
}
