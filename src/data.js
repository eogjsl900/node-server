import axios from 'axios';




let data = [{}]

axios.get('http://localhost:8080/product')
.then((결과) => {
  data = 결과.data
})
.catch(() => { console.log('실패함') })






function Item(props){
    return(
        
        <div className='col-md-4' onClick={props.onClickTest}>
        <img src={props.shoes.img} width={"80%"}></img>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.content}</p>
          <p>{props.shoes.price}</p>
        </div>
    )
  }







export { data,Item  };