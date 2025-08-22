// 在脚本文件的最顶部设置引擎配置
cc.macro.CLEANUP_IMAGE_CACHE = false;
cc.dynamicAtlasManager.enabled = true;

import PrefabCard from "./PrefabCard";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GrayShaderMian extends cc.Component {

    @property({ type: cc.Node, tooltip: '位置' })
    nodeLayout: cc.Node = null;

    @property({ type: cc.Prefab, tooltip: '卡片' })
    prefabCard: cc.Prefab = null!;

    protected onLoad(): void {
        
    }

    protected start(): void {

    }

    public initCardLayout() {
        const count: number = 20;
        for (let i = 0; i < count; i++) {
            const node = cc.instantiate(this.prefabCard);
            node.parent = this.nodeLayout;
            const card = node.getComponent(PrefabCard);
            const cardId: number = Math.floor(Math.random() * 34);
            card.initCard(cardId);
        }
    }

    private onClickBtn() {
        this.initCardLayout();
    }

}