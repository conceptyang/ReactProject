import {Header,Footer,Content,SubHeader} from "../components/common"
import {ProductList} from "../components/ProductList"
import React,{Component} from "react"

import {ScrollOptions} from "../config/config"
import ReactIScroll from "react-iscroll"
console.log(ReactIScroll)

class ClassList extends Component{
    constructor(props){
        super(props)
    }
    handeClick(id){
        console.log(id)
        this.props.changeclassID(id)
    }
    render(){
        return (
            <ul>
                {
                    this.props.classData.map((ele,index)=><li onClick={this.handeClick.bind(this,ele.classID)} key={index}>{ele.className}</li>)
                }
            </ul>
        )
    }
}

class ListPage extends Component{
    constructor(props){
        super(props);
        this.state={
            classData:[],
            listData:[]
        };
        this.classID=undefined;
        this.linenumber=5;
        this.pageCode=0;
        this.refresh=false;
        $.get("http://datainfo.duapp.com/shopdata/getclass.php",(data)=>{
            if(typeof data ==="string"){
                data=JSON.parse(data)
            }
            this.setState({
                classData: data
            })
        } ,"json");
        this.getProductData()
    }
    getProductData(){
        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
            "classID":this.classID,
            "linenumber":this.linenumber,
            "pageCode":this.pageCode
        },(data)=> {
            if(data){
                this.setState({
                    listData: this.pageCode==0?data:this.state.listData.concat(data)
                })
            }

        })
    }
    onScrollEnd(Scroll){
        if (this.refresh){
            this.pageCode=0;
            this.getProductData();
            this.refresh=false;
        }else  if (Scroll.y-Scroll.maxScrollY<=20){
            console.log("加载更多")
            this.pageCode++
            this.getProductData();
            this.refresh=false;
        }
    }
    onScroll(Scroll){
        if (Scroll.y>50){
            console.log("刷新")
            this.refresh=true
        }
    }
    changeclassID(id){
        this.classID=id;
        this.pageCode=0;
        console.log(id);
        this.getProductData();
    }
    render() {
        return (
            <div className="page" id="list-page">
                <Header title="列表" right="搜素" left="<"/>
                <SubHeader>
                    <ClassList  changeclassID={(id)=>this.changeclassID(id)} classData={this.state.classData}/>
                </SubHeader>
                <Content Hasheader={true} Hasfooter={true} >
                    <ReactIScroll iScroll={IScroll} options={ScrollOptions} onScroll={(myScroll)=>this.onScroll(myScroll)}
                                  onScrollEnd={(myScroll)=>this.onScrollEnd(myScroll)} >
                        <ProductList   listData={this.state.listData}/>
                    </ReactIScroll>


                </Content>
                <Footer/>

            </div>
        )
    }
}
ClassList.defaultProps={
    classData:[]
}
ListPage.defaultProps={
    listData:["我是商品1","我是商品2","我是商品3"]
};
export default ListPage
