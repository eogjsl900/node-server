const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()

const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET
    }
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'kimdaehunforum1',
        key: function (요청, file, cb) {
            cb(null, Date.now().toString()) //업로드시 파일명 변경가능
        }
    })
})


const { MongoClient } = require('mongodb')

let db
const url = process.env.DB_URL
new MongoClient(url).connect().then((client) => {
    console.log('DB연결성공')
    db = client.db('forum')

    //디비 연결후 접속하도록
    app.listen(8080, () => {
        console.log('http://localhost:8080 에서 서버 실행중')
    })
}).catch((err) => {
    console.log(err)
})



app.use(express.json());
var cors = require('cors');
app.use(cors());

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));


//static 파일들을 쓰겟다
app.use(express.static(path.join(__dirname, 'shop/build')))




app.get('/', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, 'shop/build/index.html'))
})

app.get('/product',async function (요청, 응답) {
    let result = await db.collection('product').find().toArray()
    응답.send( JSON.stringify(result))
})



app.post('/product', upload.single('img'), async function (요청, 응답) {
    console.log(요청.file)
    console.log(요청.body)

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



//리액트라우터 쓰는경우 추가 주소창에 경로 직접입력해도 잘됨
app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, 'shop/build/index.html'))
})