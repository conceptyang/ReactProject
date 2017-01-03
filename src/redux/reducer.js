/**
 * Created by Administrator on 2016/12/30.
 */

const reducer= (state={"listData":[1,2,3,4,5]},active)=>{
    switch (active.type){
        case "ADD_ITEM":
            var  newState = {};
            newState.listData=state.listData.concat(["新数据"])
            return newState;
            break;
        default:
            return state
    }
};
export  default reducer
