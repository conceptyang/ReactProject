import {Header,Content,Footer} from "../components/common"
import React,{Component} from "react"
import "../css/myshow.css"
import touxiang from "../imgs/touxiang.png"
class myShowPage extends Component{
    constructor(props){
        super(props)
        this.choiceList=[
            {
                path:"#/cart",
                content:"我的订单",
                classname:" "
            },
            {
                path:"#/discount",
                content:"我的优惠劵",
                classname:" "
            },
            {
                path:"#/browse",
                content:"浏览记录",
                classname:" "
            },
            {
                path:"#colect",
                content:"我的收藏",
                classname:"del"
            },

        ]

        this.userInfo=window.localStorage.getItem("userInfo")?JSON.parse(window.localStorage.getItem("userInfo")):JSON.parse(window.sessionStorage.getItem("userInfo"))
        if(this.userInfo){
            this.userID=this.userInfo.userID
        }

    }
    render(){
        return(
            <div className="myShowPage" id="myShowPage">
                <Header title="我的秀" right="充值" hasRight={true}></Header>
                <Content Hasfooter={true}>
                    <div className="pic-text">
                        <img src={touxiang}/>
                        <div className="user-info">
                            <p>昵称：{this.userID}</p>
                            <p>金额：99999.00</p>
                        </div>
                    </div>
                    <ul className="choiceBox">
                        {
                            this.choiceList.map((e,i)=> {
                                    return <li key={i} className={e.classname}><a href={e.path}><span className="choiceleft">{e.content}</span><span className="choiceright"> > </span></a>
                                    </li>
                                }
                            )
                        }

                    </ul>
                </Content>
                <Footer active="3"/>
            </div>
        )
    }
}
export default myShowPage
if (module.hot) {

    module.hot.accept();
}