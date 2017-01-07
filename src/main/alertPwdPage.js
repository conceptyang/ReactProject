import {Header,Footer,Content} from "../components/common"
import React,{Component} from "react"
import "../css/alertpwd.css"
import Cover from "../components/Cover"
class alertPwdPage extends Component{
    constructor(props){
        super(props)
        this.state={
            oldError:null,
            newError:null,
            renewError:null,
            off:false
        }
        this.oldPwd=window.localStorage.getItem("userInfo")?JSON.parse(window.localStorage.getItem("userInfo")).userPwd:JSON.parse(window.sessionStorage.getItem("userInfo")).userPwd
        this.newPwd=null;
        this.renewPwd=null;
        console.log(this.oldPwd)
    }
    oldBlur(ev){
        console.log(ev.target.value)
         if(ev.target.value != this.oldPwd){

             this.setState({
                 oldError:"原密码错误"
             })
         }else{
             this.setState({
                 oldError:""
             })
         }
    }
    newBlur(ev){
        this.newPwd=ev.target.value;
        if(this.newPwd.length<6){
            this.setState({
                newError:"密码不能少于6位"
            })
        }else {
            this.setState({
                newError:""
            })
        }
    }
    renewBlur(ev){
        this.renewPwd=ev.target.value;
        if(this.newPwd!=this.renewPwd){
            this.setState({
                renewError:"密码错误，请重新输入"
            })
        }else{
            this.setState({
                renewError:""
            })
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
            <div className="alertPwdPage" id="alertPwdPage">
                <Header title="修改密码" hasLeft={true} left="<"></Header>
                <Content>
                    <ul className="pwdlist" >
                        <li>
                             <input type="password" onBlur={(ev)=>this.oldBlur(ev)}  placeholder="请输入原密码"/>
                        </li>
                        <li className="error"><span>{this.state.oldError}</span></li>
                        <li>
                            <input type="password" onBlur={(ev)=>this.newBlur(ev)} placeholder="请输入新密码"/>
                        </li>
                        <li className="error"><span>{this.state.newError}</span></li>
                        <li>
                            <input type="password" onBlur={(ev)=>this.renewBlur(ev)} placeholder="请再次输入新密码"/>
                        </li>
                        <li className="error"><span>{this.state.renewError}</span></li>
                    </ul>
                    <p><button className="save" onClick={()=>this.butClick()}>保存</button></p>
                </Content>
                <Cover show={this.state.off} changeState={()=>this.butClick()} textcover="修改密码失败"></Cover>
            </div>
        )
    }
}
export default alertPwdPage
if (module.hot) {
    module.hot.accept();
}