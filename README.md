# node-server

app.get('/product',async function (요청, 응답) {
    let result = await db.collection('product').find().toArray()
    응답.send( JSON.stringify(result))
})



app.post('/product', upload.single('img'), async function (요청, 응답) {

    try {
        await db.collection('product').insertOne({
            title: 요청.body.title,
            content: 요청.body.content,
            price: 요청.body.price,
            img: 요청.file ? 요청.file.location : ''
        })
        응답.redirect('/')
    } catch (e) {
        console.log(e)
        응답.status(500).send('서버에러남')
    }


})


# react

let data = [{}]

axios.get('http://localhost:8080/product')
.then((결과) => {
  data = 결과.data
})
.catch(() => { console.log('실패함') })






