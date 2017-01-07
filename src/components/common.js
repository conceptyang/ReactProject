/**
 * Created by Administrator on 2016/12/29.
 */
import "../css/common.css"
import React,{Component} from "react"
import {Tools} from "../tools/tools"
class Header extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="header">
                <ul className="header-list">
                    {this.props.hasLeft?<li className="header-btn"><a  href="javascript:;" onClick={()=>window.history.go(-1)}>{this.props.left}</a>
                    </li>:<li className="side"></li>}
                    <li className="header-tit">{this.props.title}</li>
                    {this.props.hasRight?<li className="header-btn">
                        {this.props.right}
                    </li>:<li className="side"></li>}
                </ul>
            </div>
            )
    }
}
class Footer extends Component {
    constructor(props){
        super(props)
    }
    checkUser(ev){
        if (Tools.getUserId()){
            ev.target.href="#/cart"
        }else {
           window.location.hash="#/login"
        }
    }
    render(){

        return <div className="footer">
            <ul>
                {
                    this.props.footerData.map((ele,index) => <li key={index} className={index==this.props.active?"active":""} onClick={index==2?(ev)=>this.checkUser(ev):""}>
                        <a href={ele.path} ><i className="iconfont">{ele.icon}</i><p>{ele.text}</p></a>

                        </li>)
                }
             </ul>
        </div>
    }
}
class Content extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let style ="content "+(this.props.Hasheader?"has-sub-header ":"")+ (this.props.Hasfooter?"has-footer":"")
        return <div className={style}>
            {this.props.children}
            </div>
    }
    componentDidMount(){

    }
    componentDidUpdate(){

    }
}
class SubHeader extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return <div className="sub-header">{this.props.children} </div>
    }
}
Footer.defaultProps={
    footerData:[
        {text: "首页",icon:"\ue601",path:"#/"} ,
        {text: "分类",icon:"\ue603",path:"#/list"},
        {text: "购物车",icon:"\ue600",path:"javascript:;"},
        {text: "我的",icon:"\ue65d",path:"#/myShow"},
        {text: "更多",icon:"\ue602",path:"#/more"}
    ]
};
export {Header,Footer,Content,SubHeader}