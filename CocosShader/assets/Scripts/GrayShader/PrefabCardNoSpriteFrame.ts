import GrayShaderWithoutSpriteFrame from "../../Shaders/GrayShader/GrayShaderWithoutSpriteFrame";

const { ccclass, property } = cc._decorator

@ccclass
export default class PrefabCardNoSpriteFrame extends cc.Component {
    @property({ type: cc.Node, tooltip: '' })
    nodeCard: cc.Node = null!;

    @property({ type: cc.Node, tooltip: '' })
    nodeIcon: cc.Node = null!;


    private m_isGray = true;

    protected onLoad(): void {        
        
    }

    protected start(): void {

    }

    public initCard(id: number) {
        this.loadIcon(id);
    }

    private loadIcon(id: number) {
        const url = 'GrayShader/' + new String(id).padStart(2, "0");
        cc.loader.loadRes(url, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                cc.error(err);
                return;
            }
            this.nodeIcon.getComponent(cc.Sprite).spriteFrame = spriteFrame;            
        });
    }

    onClickCard() {
        this.nodeCard.getComponent(GrayShaderWithoutSpriteFrame).gray = !this.m_isGray;
        this.nodeIcon.getComponent(GrayShaderWithoutSpriteFrame).gray = !this.m_isGray;
        this.m_isGray = !this.m_isGray;
    }
}