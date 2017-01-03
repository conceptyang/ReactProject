/**
 * Created by Administrator on 2016/12/30.
 */
import React,{Component} from "react"

class ProductList extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <ul>
                {
                    this.props.listData.map( (ele,index) =>{
                        return <li key={index}>
                            <img src={ele.goodsListImg} alt=""/>
                            <p>{ele.goodsName}</p>
                            </li>
                    })
                }
            </ul>
        )
    }
}
export {ProductList}