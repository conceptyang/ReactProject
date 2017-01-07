import "../css/index.css"
import {Header,Footer,Content} from "../components/common"
import React,{Component} from "react"
import ReactIScroll from "react-iscroll"
import {ScrollOptions} from "../config/config"
import oPic1 from "../imgs/timg1.jpg"
import oPic2 from "../imgs/timg2.jpg"
import oPic3 from "../imgs/timg3.jpg"
import oPic4 from "../imgs/timg4.jpg"
import oPic5 from "../imgs/timg5.jpg"
import kuaibao from "../imgs/kuaibao.png"
import maojin from "../imgs/maojin.png"
import zixingche from "../imgs/zixingche.png"
import dianshi from "../imgs/dianshi.png"
import xie from "../imgs/xie.jpg"

import jingtiao from "../imgs/jingtiao.png"

class IndexPage extends Component{
    constructor(props){
        super(props);
        this.state={
            pics:[oPic1,oPic2,oPic3,oPic4,oPic5],
            Shi :  "",
            Fen :  "",
            Miao : ""
        }
        this.classifyList=[
            {text:"京东超市",icon:"\ue62e",color:"#F0244D"},
            {text:"全球购",icon:"\ue622",color:"#992DD1"},
            {text:"服装城",icon:"\ue614",color:"#F52281"},
            {text:"京东生鲜",icon:"\ue619",color:"#44C93E"},
            {text:"京东到家",icon:"\ue616",color:"#1EB554"},
            {text:"充值中心",icon:"\ue664",color:"#00BCF5"},
            {text:"惠赚钱",icon:"\ue655",color:"#EE3802"},
            {text:"领劵",icon:"\ue625",color:"#FFC429"},
            {text:"物流查询",icon:"\ue618",color:"#09C997"},
            {text:"我的关注",icon:"\ue60f",color:"#F66834"}
        ]
        this.seckillgoodsData=[
            {src:maojin,nowPrice:"￥45",oldPrice:"￥69"},
            {src:zixingche,nowPrice:"￥919",oldPrice:"￥998"},
            {src:dianshi,nowPrice:"￥7288",oldPrice:"￥7988"},
            {src:xie,nowPrice:"￥2000",oldPrice:"￥2222"},
            {src:maojin,nowPrice:"￥380",oldPrice:"￥456"},
            {src:zixingche,nowPrice:"￥29",oldPrice:"￥89"},
            {src:dianshi,nowPrice:"￥10",oldPrice:"￥222"},
            {src:xie,nowPrice:"￥5",oldPrice:"￥2000"},
        ]
    }
    countTime(){
        this.ds = setInterval( ()=> {
                var fDate = new Date('2017/1/7 22:00:00');
                var nDate = new Date();
                var rDate = fDate - nDate;
                var Day =  Math.floor(rDate / 86400000) ;
                var Shi =  Math.floor((rDate %86400000) / 3600000);
                var Fen =  Math.floor((rDate %86400000) % 3600000/60000);
                var Miao =  Math.floor(((rDate %86400000) % 3600000)%60000/1000);
                if (rDate <=  1 ){
                    clearInterval(this.ds);
                    return;
                }
                function biao(a){
                    if(a <10){
                        a = '0'+a;
                    }
                    return a;
                }
                this.setState({
                    Shi :  biao(Shi),
                    Fen :  biao(Fen),
                    Miao :biao(Miao)
                })
        },1000)
    }
    render() {
        return (
            <div className="indexPage" id="index-page">
                <Header title="首页"/>
                <Content Hasfooter={true} >

                        <div>
                            <div className="indexPage-content-top">
                                <div className="swiper">
                                    <div className="swiper-container" ref="swiper-container">
                                        <div className="swiper-wrapper">
                                            {
                                                this.state.pics.map((ele,i)=><div key={i} className="swiper-slide">
                                                    <img src={ele}/>
                                                </div> )
                                            }
                                        </div>
                                        <div ref="pagination" className="swiper-btns">

                                        </div>
                                    </div>
                                </div>
                                <div className="classify">
                                    <ul className="classify-ul">
                                        {
                                            this.classifyList.map((ele,i)=><li key={i}><i className="iconfont" style={{color:ele.color}}>{ele.icon}</i><p>{ele.text}</p></li>)
                                        }
                                    </ul>
                                </div>
                                <div className="firstNew">
                                    <div className="left">
                                        <img src={kuaibao}/>
                                    </div>
                                    <div className="middle">
                                        <marquee behavior="scroll" direction="down" scrollamount="10" ><span>格力表彰大会，满减最高……！走秀，不一样的购物！</span><span>格力表彰大会，满减最高……！走秀，不一样的购物！</span></marquee>
                                    </div>
                                    <div className="right">
                                        | <a href="#">更多</a>
                                    </div>
                                </div>
                            </div>
                            <div className="indexPage-content-middle">
                                <div className="seckill">
                                    <span className="seckill-left">京东秒杀</span>
                                    <span className="seckill-time">
                                        22点场
                                    </span>
                                    <span className="seckill-lastTime">
                                        <span>
                                            <span className="timeWrap">{this.state.Shi}</span> : <span className="timeWrap">{this.state.Fen}</span> : <span className="timeWrap">{this.state.Miao}</span>
                                        </span>
                                    </span>
                                    <span className="seckill-right">
                                        秒杀迎新好货 <i className="jiao">></i>
                                    </span>
                                </div>
                                <div className="goods-wrap">
                                    <div className="seckill-goods">
                                        {
                                            this.seckillgoodsData.map((ele,i)=><dl key={i}>
                                                <dt><img src={ele.src}/></dt>
                                                <dd className="np">{ele.nowPrice}</dd>
                                                <dd><del>{ele.oldPrice}</del></dd>
                                            </dl>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="indexPage-content-bottom">
                                <img src={jingtiao}/>
                            </div>
                        </div>

                </Content>
                <Footer active="0"/>
            </div>
        )
    }
    componentDidMount(){
        this.swiper=new Swiper(this.refs["swiper-container"],{
            pagination:this.refs.pagination,
            slidesPerView:"1",
            loop:true,
            autoplay:1000,
            autoplayDisableOnInteraction : false
        })
    }
    componentWillMount (){
        this.countTime();
    }
    componentDidUpdate(){
        this.swiper.update();
        this.swiper.reLoop()
    }
}

export default IndexPage
