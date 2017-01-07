import {Header,Footer,Content} from "../components/common"
import React,{Component} from "react"
import "../css/feedback.css"
import Cover from "../components/Cover"
class feedbackPage extends Component{
    constructor(props){
        super(props)
        this.state={
            off:false
        }
    }
    butClick(){

        this.setState(
            {
                off:!this.state.off
            }
        )
    }
    render(){
        return(
            <div className="feedbackPage" id="feedbackPage">
                <Header title="意见反馈" hasLeft={true} left="<"></Header>
                <Content>
                   <textarea className="text"></textarea>
                    <p><button className="save" onClick={()=>this.butClick()}>提交</button></p>
                </Content>
                <Cover show={this.state.off} changeState={()=>this.butClick()} textcover="反馈失败"></Cover>
            </div>
        )
    }
}
export default feedbackPage
if (module.hot) {
    module.hot.accept();
}
