import { useContext, useEffect, useState } from "react";
import { redirect, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Nav } from 'react-bootstrap';
import { getOrderItem } from './../store.js'
import { useDispatch, useSelector } from 'react-redux';


import { Context1 } from "./../App.js";



function DetailPage(props) {


  let [count, setCount] = useState(0)
  let [numCheck, setNumChk] = useState(true);
  let [탭, 탭변경] = useState(1);



  useEffect(() => {
    let a = setTimeout(() => { setCount(2) }, 2000)
    setNumChk(false)
    
    return () => {
      clearTimeout(a)
    }
  }, [])


  let [fade2, setFade2] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setFade2('end')
    }, 100)

    return () => {
      setFade2('')
    }

  }, [])




  let { id } = useParams();
  let index = props.shoes.findIndex(obj => obj._id == id)
  let item = props.shoes.find(obj => obj._id == id)




  let dispatch = useDispatch()

  let navigete = useNavigate();


  useEffect(() => {
    console.log(item.id)

    let 꺼낸거 = localStorage.getItem('watched')
    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(item.id)


    let size = 꺼낸거.length
    if (size > 1) {
      [꺼낸거[0], 꺼낸거[size - 1]] = [꺼낸거[size - 1], 꺼낸거[0]]
    }

    꺼낸거 = new Set(꺼낸거);
    꺼낸거 = Array.from(꺼낸거)


    localStorage.setItem('watched', JSON.stringify(꺼낸거))



  }, [])


  return (
    <div className={"start " + fade2}>
      <div className="container">
        {
          count == 2 ? null : <div className="alert alert-warning">2초이내 구매시 할인</div>
        }


        <div className="row">
          <div className="col-md-6">
            <img src={item.img} width="100%" />
          </div>


          <div className="col-md-6">
            <h4 className="pt-5">{item.title}</h4>
            <p>{item.content}</p>
            <p>{item.price}원</p>
            <button className="btn btn-danger" onClick={() => {
              dispatch(getOrderItem(item))
              navigete('/cart')

            }}>주문하기</button>
          </div>
        </div>

        <Nav justify variant="tabs" defaultActiveKey="link-1">
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={() => { 탭변경(0) }}>버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={() => { 탭변경(1) }}>버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" onClick={() => { 탭변경(2) }}>
              버튼2
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent 탭={탭} shoes={props.shoes} />


      </div>
    </div>
  )

}

function TabContent({ 탭, shoes }) {


  let [fade, setFade] = useState('')
  let { 재고 } = useContext(Context1)

  useEffect(() => {
    setTimeout(() => {
      setFade('end')
    }, 100)

    return () => {
      setFade('')
    }

  }, [탭])

  return <div className={"start " + fade}>
    {[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
  </div>
}



export { DetailPage };