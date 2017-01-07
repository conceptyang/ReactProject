import {Header,Footer,Content,SubHeader} from "../components/common"
import React,{Component} from "react"
import OrderList from "./list"
import "../css/checkOrder.css"
import {Tools} from "../tools/tools"



//确认订单页面的大体框架
class CheckOrder extends Component{
	constructor(props){
		super(props)
		this.state={
			userID:"",
			orderList:[],
			youbian:"475001",
			dizhi:"中国漠河地球村22号",
			dianhua:"13938638211",
			yunfei:5,
			totalPrice:0,
			totalNum:0
		};
		
	}
	
	getTotal(){
		if(localStorage.getItem("checkorder")){
			var newUserID = Tools.getUserId();
			this.setState({
				userID:newUserID
			})
			var aaa=localStorage.getItem("checkorder").split("&&&");

			for(var i=0;i<aaa.length;i++){
				aaa[i]=JSON.parse(aaa[i]);
			};
			console.log(aaa)
			var num =0;
			var price=0;
			for(var i=0;i<aaa.length;i++){
				num +=aaa[i].number*1;
				price += aaa[i].number *aaa[i].price;
				console.log(price)
			}
			price +=5
			this.setState({
				orderList:aaa,
				totalNum:num,
				totalPrice:Math.floor(price)
			})
		}

	}
	
	//组件即将渲染
	componentWillMount(){
		this.getTotal();
	}
	
	//提交订单
	submitOrder(){
		//引入当前数据进行判断
		var list = this.state.orderList;
		var orderItem ={
			id:new Date().getTime(),
			orderState:1,
			data:list,
			totalNum:this.state.totalNum,
			totalPrice:this.state.totalPrice
		}
		//获取当前的存在的订单数据
		var orderArray  = JSON.parse(window.localStorage.getItem("orderList")||"[]") ;
		//当前订单加入进去
		orderArray.push(orderItem);
		//保存当前更新完成的订单
		window.localStorage.setItem("orderList",JSON.stringify(orderArray))
		console.log(JSON.parse(window.localStorage.getItem("orderList")))
		//删除当前的本地数据
		localStorage.removeItem("checkorder");
		//点击事件，删除购物车当前的数据
		for(var i=0;i<list.length;i++){
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:this.state.userID,goodsID:list[i].goodsID,number:0},(data)=>{
			console.log(data)
		})
		}
		
		window.location.hash="#/myOrder"
	}
	render(){
		
		return (
			<div id="orderPage">
				<Header title="确认订单" left="<"/>
				<Content>
					<div className="ads">
						<h3>{this.state.userID}</h3>
						<span>邮编:</span><input type="text" value={this.state.youbian}/><br/>
						<span>联系电话:</span><input type="text" value={this.state.dianhua}/><br/>
						<span>地址:</span><input type="text" value={this.state.dizhi}/>
					</div>
					<OrderList ordrList={this.state.orderList}></OrderList>
					<div className="feiyong">
						<div className="yunfei">
							<span className="yunfei-left">运费:</span>
							<span className="yunfei-right">${this.state.yunfei}</span>
						</div>
						<div className="shijifei">
							<span className="shijifei-left">实际付款(含运费)</span>
							<span className="shijifei-right">${this.state.totalPrice}</span>
						</div>
					</div>
					<textarea value="信息备注。。。"></textarea>
					<div className="tijiao">
						<p>共<em>{this.state.totalNum}</em>件,总金额<em>${this.state.totalPrice}</em></p>
						<button onClick={()=>this.submitOrder()}>提交订单</button>
					</div>
				</Content>
			</div>
			
		)
	}
}

export default CheckOrder

if (module.hot) {
    module.hot.accept();
}