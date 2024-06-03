import { configureStore,createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {name:'kim' , age: 20},
    reducers : {
        changName(state){
            state.name= 'park'
        },
        changAge(state,action){
            state.age += action.payload
        }
    }
})

export  let { changName,changAge} = user.actions


export default user