/**
 * Created by Administrator on 2017/1/6.
 */
import "../css/browse.css"
import {Header,Content} from "../components/common"
import {ProductList} from "../components/ProductList"
import React,{Component} from "react"
import {ScrollOptions} from "../config/config"
import ReactIScroll from "react-iscroll"
import {Tools} from "../tools/tools"
import {Rems} from "../components/newRem"
class BrowsePage extends Component{
    constructor(props){
        super(props);
        this.state={
            listData:[]
        };
        this.goodsID=undefined;
        this.refresh=false;
        this.arr = [];
        this.getProductData();
    }
    getProductData(){
        var Histroy = Tools.getHistroy("histroy");
        if (Histroy){
            for (var i =0;i<Histroy.length-1;i++){
                $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
                    "goodsID":Histroy[i],
                },(data)=> {
                    // this.arr.push(data[0]);
                    // this.setState({listData:this.arr})
                    if(data){
                        this.setState({
                            listData:this.state.listData.concat(data[0])
                        })
                    }
                })
            }
        }

    }
    componentWillMount(){
        // setTimeout(()=>{
        //
        // },100)
    }
    changeclassID(id){
        this.classID=id;
        this.pageCode=0;
        this.getProductData();
    }
    render() {
        return (
            <div className="browsePage" id="browse-page">
                <Header  hasRight={true} hasLeft={true} left="<"  title="历史记录" right={<a onClick={()=>Tools.delLocalStorage("histroy")}>清空</a>} />
                <Content>
                    <ReactIScroll iScroll={IScroll} options={ScrollOptions}>
                        <ProductList   listData={this.state.listData}/>
                    </ReactIScroll>
                </Content>
            </div>
        )
    }
    componentDidMount(){
        Rems.rem(document, window);
    }
}
export default BrowsePage
