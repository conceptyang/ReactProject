import {Header,Content} from "../components/common"
import React,{Component} from "react"
import "../css/register.css"

class RegisterPage extends Component{
    constructor(props) {
        super(props)
        this.state={
            nameError:null,
            pwdError:null,
            repwdError:null
        }
        this.userName=null;
        this.pwd=null;
        this.repwd=null;
        this.success=false;
    }
    userChange(ev){
        this.userName=ev.target.value;
        if(!this.userName){
            this.setState({
               nameError:"用户名不能为空"
            })
        }else{
            this.setState({
                nameError:""
            })
        }
    }
    pwdChange(ev){
        this.pwd=ev.target.value;
        if(this.pwd.length<6){
            this.setState({
                pwdError:"密码不能少于6位"
            })
        }else{
            this.setState({
                pwdError:""
            })
        }
    }
    repwdChange(ev){
        this.repwd=ev.target.value;
        if(this.pwd!=this.repwd){
            this.setState({
                repwdError:"请重新输入密码"
            })
        }else{
            $.get("http://datainfo.duapp.com/shopdata/userinfo.php?",{
                "status":"register",
                "userID":this.userName,
                "password":this.pwd
            },(data)=>{
                if(data==0){
                    this.setState({
                        nameError:"用户名重名"
                    })
                }else if(data==1){
                    this.success=true;
                    this.setState({
                        nameError:" "
                    })
                }
            })
            this.setState({
                repwdError:" "
            })
        }
    }
    butClick(){
        if(this.success===false){
            return false
        }else{
            window.location.hash="#/login"
        }
    }
    render() {
        return (
            <div className="RegisterPage" id="RegisterPage">
                <Header title="走秀用户注册" ></Header>
                <Content>
                    <ul className="register-list">
                        <li>
                            <span>账户名称:</span>
                            <input type="text"  className="text-bar" onBlur={(ev)=>this.userChange(ev)} placeholder="请输入用户"/>
                        </li>
                        <li className="error"><span>{this.state.nameError}</span></li>
                        <li>
                            <span>登录密码:</span>
                            <input type="password" className="text-bar" onBlur={(ev)=>this.pwdChange(ev)} placeholder="请输入密码"  />
                        </li>
                        <li className="error"><span>{this.state.pwdError}</span></li>
                        <li>
                            <span>确认密码:</span>
                            <input type="password" className="text-bar" onBlur={(ev)=>this.repwdChange(ev)} placeholder="请输入密码" />
                        </li>
                        <li className="error"><span>{this.state.repwdError}</span></li>
                    </ul>
                      <a className="go-login" href="javascript:void(null)" onClick={()=>this.butClick()} ><button className="bigbut" >确定注册</button></a>
                </Content>
            </div>
        )
    }
}
export default RegisterPage
if (module.hot) {

    module.hot.accept();
}