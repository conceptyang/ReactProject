import {Header,Footer,Content} from "../components/common"
import React,{Component} from "react"
import "../css/more.css"
class morePage extends Component{
    constructor(props){
        super(props)
        this.morelist=[
            {
                path:"#/alertpwd",
                content:"修改密码"
            },
            {
                path:"#/feedback",
                content:"用户反馈"
            },
            {
                path:"#/feedback",
                content:"关于"
            }
        ]
    }
    render(){
        return(
               <div className="morePage" id="morePage">
                   <Header hasLeft={true} left="<" title="更多"/>
                   <Content>
                       <ul className="morelist">
                           {
                               this.morelist.map((e,i)=>{
                                   return (
                                       <li key={i}><a href={e.path}><span className="list-left">{e.content}</span><span className="list-right"> > </span></a></li>
                                   )
                               })
                           }

                       </ul>
                   </Content>
               </div>
            )

    }
}
export default morePage
if (module.hot) {
    module.hot.accept();
}