import GrayShader from "../../Shaders/GrayShader/GrayShader";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PrefabCard extends cc.Component {
    @property({ type: cc.Node, tooltip: '' })
    nodeCard: cc.Node = null!;

    @property({ type: cc.Node, tooltip: '' })
    nodeIcon: cc.Node = null!;


    private m_isGray = true;

    protected start(): void {

    }

    private onStartInit() {
        const parentNode: cc.Node = this.nodeCard.parent;
        if (!cc.isValid(parentNode)) {
            return;
        }

        const cardId: number = Math.floor(Math.random() * 34);
        this.loadIcon(cardId);
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

    private onClickCard() {
        this.nodeCard.getComponent(GrayShader).gray = !this.m_isGray;
        this.nodeIcon.getComponent(GrayShader).gray = !this.m_isGray;
        this.m_isGray = !this.m_isGray;
    }
}
