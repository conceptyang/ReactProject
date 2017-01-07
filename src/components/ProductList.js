/**
 * Created by Administrator on 2016/12/30.
 */
import React,{Component} from "react"
import {Link} from "react-router"
import {Tools} from "../tools/tools"
class ProductList extends Component{
    constructor(props){
        super(props)
    }
    setLocalstorage(ev){
        Tools.setHistroy(ev);
    }
    render(){
        return (
            <ul className="pro-list">
                {
                    this.props.listData.map( (ele,index) =>{
                        return <li key={index} className="pro-item">
                            <a  href={"#/detail/"+ele.goodsID} className="pic" onClick={()=>this.setLocalstorage(ele.goodsID)}>
                                <img src={ele.goodsListImg}/>
                            </a>
                            <Link to={"/detail/"+ele.goodsID}><p>{ele.goodsName}</p></Link>
                             <p className="price"><em>￥{ele.price}</em> <del>￥888</del></p>
                            </li>
                    })
                }
            </ul>
        )
    }
}
export {ProductList}