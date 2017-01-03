/**
 * Created by Administrator on 2016/12/29.
 */
import "../css/common.css"
import React,{Component} from "react"
class Header extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="header">
                <ul className="header-list">
                    <li className="header-btn">
                        <a href="#">{this.props.left}</a>
                    </li>
                    <li className="header-tit">{this.props.title}</li>
                    <li className="header-btn">
                        <a href="#">
                            {this.props.right}
                        </a>
                    </li>
                </ul>
            </div>

            )

    }
}
class Footer extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return <div className="footer">
            <ul>
                {
                    this.props.footerData.map((ele,index) => <li key={index}>{ele}</li>)
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
    footerData:["首页","列表","活动","购物车","我的"]
};
export {Header,Footer,Content,SubHeader}