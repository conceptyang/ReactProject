import {Header,Footer,Content,SubHeader} from "../components/common"

import React,{Component} from "react"

import "../css/productCar.css"

import {link} from "react-router"   //路由的连接的使用
import {Tools} from "../tools/tools"

//整合购物车页面中见的主体部分的搭建
class CarList extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<ul className="carList">
				{
					this.props.carData.map((ele,index)=><li key={index} className="cart-item">
						<input type="checkbox" name="carProduct" className="carleft"/>
						<div className="carRight">
							 <a href="###" className="pic"><img src={ele.goodsListImg} /></a>
	                        <div className="info">
	                            <p className="p-name">{ele.goodsName}</p>
	                            <p className="price">单价: <em>${ele.price}</em></p>
	                            <div className="num-wrap">
	                            	数量:  
	                                <button   className="minus" onClick={()=>this.props.changeData(-1,index)}>-</button>
	                                <input type="text" value={ele.number} disabled="disabled"/>
	                                <button  className="plus" onClick={()=>this.props.changeData(1,index)}>+</button>
	                            </div>
	                        </div>
	                        <a className="delete" href="javascript:void (0);" ><i className="iconfont" onClick={()=>this.props.changeData(0,index)}>&#xe636;</i>
</a>
                        </div>
					</li>)
				}
			</ul>
		)
	}
}


//没有商品的页面
class NothingCar extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div className="notingBox">
				<i className="iconfont">&#xe608;</i>
				<p>购物车空</p>
			</div>
		)
	}
}

//进行购物车整体的结构的搭建
class ProductCar extends Component{
	
	constructor(props){
		super(props)
		//设置状态
		this.state={
			carData:[],
			totalNumber:0,
			totalPrice:0,
			userID:""
		}
		//加载也额面之前，进行购物车数据的加载
		this.uodateCar();
		//设置函数，让子文件也能影响元素的设置
		this.changeData = this.changeData.bind(this)
	}
	
	//请求最新的购物车数据
	uodateCar(){
		this.userID = Tools.getUserId();

		$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:this.userID},(data)=>{
			this.setState({
				carData:data
			})
			//调用函数进行总数的计算
			this.getTotal(data)
		})
	}
	
	//函数进行总数和总价格的统计
	getTotal(data){
		var num = 0;
		var price = 0;
		for(var i=0;i<data.length;i++){
			num += data[i].number*1;
			price += data[i].number*data[i].price
		}
		this.setState({
			totalNumber:num,
			totalPrice:price
		})
	}
	
	//点击加减，改变商品的数量
	changeData(type,index){
		var data = this.state.carData;
		var id = data[index].goodsID;
		var num = data[index].number;
		if(type){
			//增加减少数量
			num =type + num*1; 
		}else{
			//删除
			num =0
		}
		$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:this.userID,goodsID:id,number:num},(data)=>{
			this.uodateCar();
		})
		
	}
	
	//点击结算运行函数
	toConfirm(){
		var check = $('.carleft');
		var newData =[];
		var flag = false;
		for(var i=0,index=0;i<check.length;i++){
			if(check[i].checked == true){
				newData[index] = JSON.stringify(this.state.carData[i]);
				index ++;
				flag =true;
			}
		}
		
		if(flag){
			localStorage.setItem("checkorder",newData.join("&&&"))
			window.location.hash="#/checkorder"
		}else{
			alert('请选择商品')
		}
		
	}
	
	
	//渲染的部分
	render(){
		return (
			<div id="carPage">
				<Header title="购物车" hasRight={true} hasLeft={true} right={<a href="javascript:;" onClick={()=>this.toConfirm()}>结算</a>} left="<"></Header>
				<SubHeader>
					<div className="cart-bar">
                        <span><i>商品总数:</i><em>{this.state.totalNumber}</em></span>
                        <span><i>应付总额(不含运费):</i><em className="priceColor">${this.state.totalPrice}</em></span>
                    </div>
				</SubHeader>
				<Content hasFooter={true} hasSubHeader={true}>
					{this.state.carData==0?<NothingCar></NothingCar>:<CarList changeData={this.changeData} carData={this.state.carData}></CarList>}
					
				</Content>
				<Footer active="2" />
				
			</div>
		)
	}
}



//暴露接口
export default ProductCar

if (module.hot) {
    module.hot.accept();
}