import { configureStore,createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'


let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]

})



let cartList = createSlice({
    name : 'cartList',
    initialState : [

      ] ,
      reducers : {
        plusCount(state,action){
            let idx = state.findIndex(item => item.id == action.payload)

            state[idx].count +=1 
        },
        getOrderItem(state,action){

            const newItem = action.payload;
            let idx = state.findIndex(item => item.id == newItem._id)
            console.log(idx)

            if(idx != -1){
                state[idx].count += 1
            }else{
                state.push({
                    id: newItem._id,
                    name: newItem.title,
                    count: 1
                  })
            }
            

            
        }
    }
})
export  let { plusCount,getOrderItem} = cartList.actions


export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cartList : cartList.reducer
   }
}) 
