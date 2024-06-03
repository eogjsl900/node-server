import { useState } from 'react';
import axios from 'axios';
import {  useNavigate} from 'react-router-dom'






function Product() {
    let navigete = useNavigate();

    let [product, setProduct] = useState({
        title: '',
        content: '',
        price: '',
        img: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setProduct({ ...product, [name]: files[0] });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = () => {

        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('content', product.content);
        formData.append('price', product.price);
        formData.append('img', product.img);
        
        console.log(product)

        axios.post('http://localhost:8080/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data);
                navigete('/')
            })
            .catch(() => {
                console.log('실패함');
            });
    };


    return (
        <div>
            <div className="form-box">
                <p>상품명</p>
                <input name="title" value={product.title} onChange={handleChange} />
                <p>내용</p>
                <input name="content" value={product.content} onChange={handleChange} />
                <p>가격</p>
                <input name="price" value={product.price} onChange={handleChange} />
                <p>사진</p>
                <input type="file" name="img" accept="image/*" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit}>등록</button>
        </div>
    );
}

export default Product;
