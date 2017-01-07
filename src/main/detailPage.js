import "../css/detail.css"
import {Header,Content} from "../components/common"
import React,{Component} from "react"
import {Router,Route,hashHistory,Link} from "react-router"
import {Tools} from "../tools/tools"
class DetailPage extends Component{
    constructor(props){
        super(props)
        this.state={
            bannerList:[],
            goodname:"",
            goodprice:"",
            buynumber:""
        }
        this.num=0;
        this.goodID=this.props.params.goodsID
        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:this.goodID},(data)=>{
            this.setState({
                    bannerList:JSON.parse(data[0].imgsUrl),
                    goodname:data[0].goodsName,
                    goodprice:data[0].price,
                    buynumber:data[0].buynumber
                })
        }


        )
    }
    addCart(){
        var userID =Tools.getUserId()
        this.num++;

        userID && $.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:userID,goodsID:this.goodID,number:this.num},
            function (data) {
                if (data==1){
                    alert("添加成功")
                }else {
                    alert("添加失败")
                }
            })
    }
    checkUser(ev){
        if (Tools.getUserId()){
            ev.target.href="#/cart"
        }else {
            ev.target.href="#/login"
        }
    }
    render() {
        return (
            <div className="detailPage" id="detail-page">
                <Header title={"商品资料"} hasRight={true} hasLeft={true} left="<" right={<a className="iconfont" onClick={(ev)=>this.checkUser(ev)}>&#xe608;</a>}/>
                    <Content className="content">
                        <div className="swiper-container" ref="swiper-container">
                            <div className="swiper-wrapper">
                                {
                                    this.state.bannerList.map((ele,i)=><div key={i} className="swiper-slide">
                                        <img src={ele}/>
                                       </div> )
                                }
                            </div>
                        </div>
                        <div ref="pagination" className="swiper-btns">
                            <ul className="self-Pagination"></ul>
                        </div>
                        <ul className="pro-info">
                            <li className="pro-name">{this.state.goodname}</li>
                            <li className="pro-price"><em>￥{this.state.goodprice}</em><del>￥999</del></li>
                            <li className="pro-num">购买人数 :&nbsp;{this.state.buynumber}</li>
                        </ul>
                        <div className="swiper-self-pagination"></div>
                    </Content>
                <div className="detail-footer">
                    <div className="look-wrap">
                        <i className="iconfont">&#xe6c6;</i>
                        <a className="look-detail" href={"#/information/"+this.goodID}>查看商品详情</a>
                    </div>
                    <div className="add-wrap">
                        <button className="add-cart" onClick={()=>this.addCart()}>添加到购物车</button></div>
                    </div>

            </div>

        )
    }
    componentDidMount(){
        this.swiper=new Swiper(this.refs["swiper-container"],{
            pagination:this.refs.pagination,
            slidesPerView:'3',
            loop:true
        })
    }
    componentDidUpdate(){
        this.swiper.update();
        this.swiper.reLoop()
    }






}
export default DetailPage