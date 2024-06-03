import { createContext, lazy, useState } from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { data, Item } from './data.js'
import { DetailPage } from './routes/Detail.js'
import Cart from './routes/Cart.js'
import Product from './routes/Product.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';

import { useQuery } from 'react-query';

//const Cart = lazy(()=>import('./routes/Cart.js'));
//const DetailPage  = lazy(()=>import('./routes/Detail.js'));

export let Context1 = createContext();

function App() {

  useEffect(() => {

    let getWatched = localStorage.getItem('watched')
    getWatched = JSON.parse(getWatched)

    if (getWatched == null) {
      localStorage.setItem('watched', JSON.stringify([]))
    }


  }, [])

  




  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12]);

  let navigete = useNavigate();
  let [buttonClick, setClick] = useState(0);
  let [pop, setPop] = useState(false)
  let [count, setCount] = useState(0)

  useEffect(() => {
    let num = count + 1;
    setCount(num)
  }, [buttonClick])


  useEffect(() => {
    setShoes(data)
    console.log(1111)

  }, [data])









  // useQuery 성공/실패/로딩중 쉽게 파악가능
  let result = useQuery('작명', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      console.log('요청됨')
      return a.data
    })
  },
    { staleTime: 2000 }
  )


  return (
    <div className="App">


      {/* <Button variant="primary">Primary</Button>{' '} */}
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigete('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigete('/cart') }}>장바구니</Nav.Link>
            <Nav.Link onClick={() => { navigete('/product') }}>상품등록</Nav.Link>
          </Nav>

          <Nav className='ms-auto'>
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>




        </Container>
      </Navbar>



      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <div>
              <h4>최근본상품</h4>
              {/* { localArr.map(function(a,i){
                return(
                <p>상품ID:{a}</p>
              )
              })} */}

            </div>
            <div className="container">
              {pop == false ? null : <div className="alert alert-warning">로딩중입니다.</div>}
              <div className="row">

                {

                  shoes.map(function (a, i) {
                    return (
                      <Item
                        shoes={a}
                        i={i + 1}
                        key={i}
                        onClickTest={() => navigete('/detail/' + a._id)}
                      >
                      </Item>
                    )
                  })

                }

              </div>
              <button onClick={() => {

                setPop(true)
                setClick(buttonClick + 1)

                if (count == 1) {
                  axios.get('https://codingapple1.github.io/shop/data2.json')
                    .then((결과) => {
                      setPop(false)
                      let newArr = [...shoes]
                      newArr = newArr.concat(결과.data)
                      setShoes(newArr)
                      console.log(shoes)
                    })
                    .catch(() => { console.log('실패함') })
                }
                else if (count == 2) {
                  axios.get('https://codingapple1.github.io/shop/data3.json')
                    .then((결과) => {
                      setPop(false)
                      let newArr = [...shoes]
                      newArr = newArr.concat(결과.data)
                      setShoes(newArr)
                      console.log(shoes)
                    })
                    .catch(() => { console.log('실패함') })
                } else {
                  setPop(false)
                  alert("상품이없습니다.");
                }



                // 포스트 요청
                // axios.post('/url',{name : 'kim'})

                // 여러요청 한번에 하고싶을때 두개의 요청 성공했을때 then 실행.
                // Promis.all([axios.get('/url1'),axios.get('/url2')])
                // .then(()=>{
                // })

                //fetch('url')  이건 기본js 코드

              }}>더보기</button>
            </div>
          </>
        } />

        <Route path='/detail/:id' element={
          <Context1.Provider value={{ 재고 }}>
            <DetailPage shoes={shoes} />
          </Context1.Provider>
        } />

        <Route path="/cart" element={<Cart></Cart>}></Route>


        <Route path='/about' element={<About />} >
          <Route path='member' element={<div>멤버임</div>} />
          <Route path='location' element={<div>위치정보임</div>} />
        </Route>


        <Route path='/product' element={<Product />} > </Route>





        <Route path='*' element={<div>없는페이지요</div>} />
      </Routes>




    </div>
  );

  function About() {
    return (
      <div>
        <h4>회사정보임</h4>
        <Outlet></Outlet>
      </div>
    )
  }




}







export default App;
