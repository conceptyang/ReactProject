import "../css/Cover.css"
import React,{Component} from "react"
class Cover extends Component{
    constructor(props){
        super(props)
    }
    back(){
        this.props.changeState()
    }
    render(){
        var covername=this.props.show?"cover showcover":"cover"
        return(
            <div className={covername}>
                <div className="tooltip">
                    <p className="title"><button className="back" onClick={()=>this.back()}>X</button></p>
                    <p className="cover-con">{this.props.textcover}</p>
                </div>
            </div>
        )
    }
}
export default Cover
