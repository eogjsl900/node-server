import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changName,changAge } from './../store/userSlice.js';
import { plusCount } from './../store.js';
import { memo, useMemo, useState } from 'react';


function 함수(){
    return 
}


function Cart() {

    let state = useSelector((state) => { return state })
    let dispatch = useDispatch()

    return (
        <div>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cartList.map(function (a, i) {
                            return (
                                <tr>
                                    <td>{i}</td>
                                    <td>{state.cartList[i].name}</td>
                                    <td>{state.cartList[i].count}</td>
                                    <td>
                                        <button onClick={()=>{
                                            dispatch(plusCount(state.cartList[i].id))
                                        }} > +</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}


export default Cart;