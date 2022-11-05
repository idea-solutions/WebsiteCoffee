import React, {useState, useEffect} from 'react'

import axios from 'axios'

import logo from '../../../assets/images/icon.png'

import { Link } from 'react-router-dom'

import Button from '../../../components/Button/Button'

const ProductCategories = () => {
    const [id,setId] = useState("");
    const [productCategory, setProductCategory] = useState([])
    useEffect(() => {
      axios.get('http://localhost:8000/categoryproduct').then((res) => {
        setProductCategory(res.data)
      })
    }, [])
    return (
        <div>
            <h2 className="page-header">
                Loại sản phẩm
            </h2>
            <Button type="button">
                <a href="./AddProductCategory">
                Thêm loại sản phẩm
                </a>
            </Button>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Mã loại</th>
                                <th>Tên loại</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productCategory.map((item) =>
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td style={{ minWidth: 100 }}>
                                        <Button><Link to={'/admin/EditProductCategories/'}>Sửa</Link></Button>|
                                        <Button><Link to={'/admin/DeleteProductCategories/'}>Xóa</Link></Button>|
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCategories
