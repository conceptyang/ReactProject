/**
 * Created by Administrator on 2017/1/6.
 */
import "../css/information.css"
import {Header,Content} from "../components/common"
import React,{Component} from "react"
import {Router,Route,hashHistory,Link} from "react-router"
import {Tools} from "../tools/tools"
class InformationPage extends Component{
    constructor(props){
        super(props)

        this.state={
            pic:"",
            goodsName:"",
            caizhi:"",
            chandi:"",
           className:""
        }
        this.goodID=this.props.params.goodsID;
        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:this.goodID},(data)=>{
            console.log(data)
            this.setState({
                pic:data[0].goodsListImg,
                goodsName:data[0].goodsName,
                caizhi:data[0].detail,
                className:data[0].className,
            })
        })
    }

    render() {
        return (
            <div className="informationPage" id="information-page">
                <Header title="商品资料" hasLeft={true} hasRight={true} left="<" right={<a className="iconfont">&#xe608;</a>}/>
                <Content>
                    <div className="iformation-pic">
                        <img src={this.state.pic} alt="商品资料"/>
                    </div>
                    <div className="iformation-content">
                        <p>品牌名称：美特斯邦威Meterbonwe</p>
                        <p>商品名称：{this.state.goodsName}</p>
                        <p>材质：{this.state.caizhi}</p>
                        <p>产地：中国</p>
                        <p>商品编号：6900252970172</p>
                        <p>洗涤说明：最高洗涤温度30度，缓和程序，不可漂白，悬挂晾干，熨斗地板最高温度110度，不可干洗</p>
                        <p>所属分类：{this.state.className}</p>
                        <p>备注：无配件</p>
                        <p>其他：24164320</p>

                    </div>
                </Content>

            </div>

        )
    }
}
export default InformationPage