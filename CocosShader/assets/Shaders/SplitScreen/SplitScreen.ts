const { ccclass, property, menu, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
@menu('2D/SplitScreen')
export default class SplitScreen extends cc.Component {

    @property({ type: cc.Integer, tooltip: '' })
    _splitCount = 2;

    @property({ type: cc.Integer, min: 1 })
    get splitCount() {
        return this._splitCount;
    }
    set splitCount(value) {
        this._splitCount = value;
        this.refreshSplitCount();
    }

    /**当前的Sprite组件 */
    private m_sprite: cc.Sprite = null!;

    /**精灵上的材质 */
    private m_material: cc.Material = null!;

    protected onLoad(): void {
        this.m_sprite = this.getComponent(cc.Sprite)!;
        this.m_material = this.m_sprite.getMaterial(0)!;   //获取材质          
        if (this.m_material.name !== "splitScreen_material (Instance)") {
            cc.error("节点：", this.name, "材质的名字不是splitScreen_material");
            return;
        }
        this.refreshSplitCount();
    }

    private refreshSplitCount() {
        this.m_material.setProperty('splitCount', this.splitCount);
    }
}
