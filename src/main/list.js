import React,{Component} from "react"
import "../css/checkOrder.css"

//确认订单的订单信息
class OrderList extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div className="orderList">
				<ul>
					{
						this.props.ordrList.map((ele,index)=><li key={index} className="order-item">
							<div className="order-left"><img src={ele.goodsListImg} /></div>
							<div className="order-one">
					     		<span className="one-left">{ele.goodsName}</span>
								<span className="one-right">${ele.price}</span>
							</div>
							<div className="order-two">x{ele.number}</div>
						</li>)
					}
				</ul>
			</div>
		)
	}
}

export default OrderList

if (module.hot) {
    module.hot.accept();
}