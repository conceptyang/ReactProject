import React, {Component} from  "react"
import ReactDOM from "react-dom"
import {Router,Route,hashHistory,Link} from "react-router"


//列表详情部分
import IndexPage from "./main/indexPage"
import ListPage from "./main/listPage"
import DetailPage from "./main/detailPage"
import InformationPage from "./main/informationPage"
import BrowsePage from "./main/browsePage"
//用户登录注册部分
import feedbackPage from "./main/feedbackPage"
import LoginPage from "./main/loginPage"
import RegisterPage from  "./main/registerPage"
import myShowPage from "./main/myShowPage"
import morePage from  "./main/morePage"
import alertPwdPage from "./main/alertPwdPage"
//购物车订单部分
import ProductCar from "./main/productCar"
import CheckOrder from "./main/checkOrder"
import MyOrder from "./main/myOrder"



ReactDOM.render(<Router history={hashHistory}>
    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="myShow" component={myShowPage}/>
    <Route path="more" component={morePage}/>
    <Route path="alertpwd" component={alertPwdPage}/>
    <Route path="feedback" component={feedbackPage}/>

    <Route path="/" component={IndexPage}  />
    <Route path="list" component={ListPage}  />
    <Route path="detail(/:goodsID)" component={DetailPage} />
    <Route path="information(/:goodsID)" component={InformationPage} />
    <Route path="browse(/:goodsID)" component={BrowsePage} />

    <Route path="cart" component={ProductCar}  />
    <Route path="checkorder" component={CheckOrder} />
    <Route path="myOrder" component={MyOrder}  />

</Router>,document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}