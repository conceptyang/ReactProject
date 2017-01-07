import {Header,Footer,Content,SubHeader} from "../components/common"
import React,{Component} from "react"
import "../css/myOrder.css"
import OrderList from "./list"

//获取当前的导航栏的信息
class StateList extends  Component{
    constructor (props){
        super(props)
    }
    selectOrderState(index){
    	this.props.selectOrderState(index)
    }
    render() {
        var data = this.props.stateData||["全部","未支付","待发货","待收货","待评价"];
        return (
            <ul>
                {
                    data.map((ele,i)=><li key={i} className="order-state-list" onClick={()=>this.selectOrderState(i)}>
                        {ele}
                    </li>)
                }
            </ul>
        )
    }
}


//按钮的设置
class OrderBtns extends  Component{

    constructor (props){
        super(props)
    }
    clearOrder(listId){
    	this.props.clearOrder(listId)
    }
    pay(listId){
    	this.props.pay(listId)
    }
    render() {
    	var state = this.props.orderList.orderState
        return (
			<div className="order-btns">
                {
                    state==1?<div>
                        <em>待付款</em>
                        <button onClick={()=>this.pay(this.props.orderList.id)}>立即付款</button>
                        <button onClick={()=>this.clearOrder(this.props.orderList.id)}>取消订单</button>
                    </div>:state==2?<div>
                        <em>待发货</em>
                        <button>提醒发货</button>
                    </div>:state==3?<div>
                        <em>待收货</em>
                        <button>确认发货</button>
                    </div>:<div>
                        <em>待评价</em>
                        <button>去评价</button>
                    </div>
                }

            </div>
        )
    }
}

//商品的列表
class OrderListshow extends  Component{

    constructor (props){
        super(props)
    }
    render() {
        var data = this.props.orderData||[];
        return (
            <ul className="order-list"  id="orderPage">
                {
                    data.map((ele,i)=><li className="order-li" key={i}>
                        <OrderList ordrList={ele.data}/>
                        <div className="total-info">
			                <span><i>总金额:</i><em>{ele.totalPrice}</em></span>
			                <span><i>总数量:</i><em>{ele.totalNum}</em></span>
			            </div>
                        <OrderBtns orderList={ele} clearOrder={this.props.clearOrder} pay={this.props.pay}/>
                    </li>)
                }
            </ul>
        )
    }
}



//未付款 未发货 未收货 未评价
class MyOrder extends Component{
	constructor(props){
		super(props)
		this.state={
			orderList:[]
		}
		this.clearOrder = this.clearOrder.bind(this)
		this.pay = this.pay.bind(this)
		this.selectOrderState = this.selectOrderState.bind(this)
	}
	
	//获取当前的数据
	huoqulist(){
		var list =JSON.parse(window.localStorage.getItem("orderList"));
		this.setState({
			orderList:list
		})
	}
	//把数据加载到状态当中去
	componentWillMount(){
		this.huoqulist();
	}
	//清除当前订单
	clearOrder(listId){
		//更新state 
        var state = this.state.orderList;
        state= state.filter(function(ele){
            return ele.id!=listId
        });
        this.setState({
            orderList:state
        });
        //删除本地保存的数据
        var data =  JSON.parse(window.localStorage.getItem("orderList")||"[]");
        data = data.filter(function(ele){
            return ele.id!=listId
        });
        window.localStorage.setItem("orderList",JSON.stringify(data));
	}
	//付款按钮
	pay(listId){
		var state= JSON.parse(window.localStorage.getItem("orderList"));
		console.log(state)
		for(var i=0;i<state.length;i++){
			if(listId == state[i].id){
				state[i].orderState=2
			}
		}
		this.setState({
            orderList:state
        });
        window.localStorage.setItem("orderList",JSON.stringify(state));
	}
	
	//改变订单状态
	selectOrderState(index){
		console.log(index)
		var data =  JSON.parse(window.localStorage.getItem("orderList"));
		if(index !=0){
			data = data.filter(function(ele){
                return ele.orderState==index
            });
		}
		console.log(data)
		this.setState({
            orderList:data
        });
	}
	
	render(){
		
		return(
				<div id="myOrderPage">
					<Header title="我的订单" left="<"/>
					<SubHeader><StateList selectOrderState={this.selectOrderState}/></SubHeader>
					<Content hasSubHeader={true} hasIScroll={true}>
	                    <OrderListshow orderData={this.state.orderList} clearOrder={this.clearOrder} pay={this.pay}/>
	                </Content>
				</div>
		)
	}
}

export default MyOrder

if (module.hot) {
    module.hot.accept();
}