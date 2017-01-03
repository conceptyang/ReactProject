import React, {Component} from  "react"
import ReactDOM from "react-dom"
import {Router,Route,hashHistory} from "react-router"

import IndexPage from "./main/indexPage"
import ListPage from "./main/listPage"
import DetailPage from "./main/detailPage"



ReactDOM.render(<Router history={hashHistory}>

    <Route path="/" component={IndexPage}  />
    <Route path="list" component={ListPage}  />
    <Route path="detail" component={DetailPage} />

</Router>,document.getElementById("root"));





if (module.hot) {
    module.hot.accept();
}