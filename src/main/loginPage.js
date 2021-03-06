import {Header,Footer,Content} from "../components/common"
import React,{Component} from "react"
import "../css/login.css"
class LoginPage extends Component{
    constructor(props) {
        super(props)
        if(window.localStorage.getItem("userInfo")){
            var Info=JSON.parse(window.localStorage.getItem("userInfo"))
            this.state={
                nameError:null,
                pwdError:null,
                userID:Info.userID,
                password:Info.userPwd,
                pwdType:"password"
            }
        } else{
            this.state={
                nameError:null,
                pwdError:null,
                userID:null,
                password:null,
                pwdType:"password"
            }
        }

        this.controlPwd=true;
        this.rem=false;
    }
    nameChange(ev){
        this.setState({
            userID:ev.target.value
        })
    }
    nameBlur(ev){
        this.setState({
            userID:ev.target.value
        })
    }
    pwdChange(ev){
        var str=ev.target.value.replace(/\W/g,"");
        this.setState({
            password:str
        })
    }
    pwdBlur(ev){
        this.setState({
            password:ev.target.value
        })
    }
    loginClick(){
        $.get("http://datainfo.duapp.com/shopdata/userinfo.php",{
            "status":"login",
            "userID":this.state.userID,
            "password":this.state.password
        },(data)=>{
            if(data==0){
                this.setState({
                    nameError:"用户名不存在",
                    pwdError:""
                })
            }else if(data==2){
                this.success=true;
                this.setState({
                    nameError:"",
                    pwdError:"密码错误 "
                })
            }else if(this.rem){
                let userInfo={
                    userID:this.state.userID,
                    userPwd:this.state.password
                }
                this.setState({
                    nameError:"",
                    pwdError:""
                })
                 window.localStorage.setItem("userInfo",JSON.stringify(userInfo))
                 window.location.hash="#/"
            }else{
                let userInfo={
                    userID:this.state.userID,
                    userPwd:this.state.password
                }
                this.setState({
                    nameError:"",
                    pwdError:""
                })
                window.sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
                window.location.hash="#/"
            }
        })
    }
    ChangeType(){
        this.controlPwd=!this.controlPwd;
        console.log(this.controlPwd);
        if(this.controlPwd){
            this.setState({
                pwdType:"password"
            })
        }else
        {
            this.setState({
                pwdType:"text"
            })
        }
    }
    RemberPwd(){
        this.rem=!this.rem;
    }
    render() {
        return (
            <div className="LoginPage" id="LoginPage">

                    <Header title="走秀用户登录" ></Header>
                    <Content>
                        <ul className="login-list">
                            <li>
                                <input type="text" placeholder="请输入账户" onChange={(ev)=>this.nameChange(ev)} value={this.state.userID} onBlur={(ev)=>this.nameBlur(ev)} className="text-bar" />
                            </li>
                            <li className="error"><span>{this.state.nameError}</span></li>
                            <li>
                                <input type={this.state.pwdType} onChange={(ev)=>this.pwdChange(ev)} value={this.state.password} placeholder="请输入密码" onBlur={(ev)=>this.pwdBlur(ev)} className="text-bar"   />
                            </li>
                            <li className="error"><span>{this.state.pwdError}</span></li>
                            <li>
                                <label>
                                    <input type="checkbox" onClick={()=>this.RemberPwd()} />
                                    <span>记住密码</span>
                                </label>
                                <a className="go-forget">忘记密码？</a>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox" onClick={()=>this.ChangeType()}/>
                                    <span>显示密码</span>
                                </label>
                            </li>
                            <li>
                                <button className="login-in" onClick={()=>this.loginClick()} >登录</button>
                            </li>
                            <li>
                                <a className="go-reg" href="#register">注册</a>
                            </li>
                        </ul>
                    </Content>
                </div>
        )
    }
}
export default LoginPage