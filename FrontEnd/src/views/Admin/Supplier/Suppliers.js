import React, { useState, useEffect } from 'react'

import axios from 'axios'

import logo from '../../../assets/images/icon.png'

import { Link } from 'react-router-dom'

import Button from '../../../components/Button/Button'

const Suppliers = () => {
    const [id, setId] = useState("");
    const [supplier, setSupplier] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/supplier').then((res) => {
            setSupplier(res.data)
        })
    }, [])
    return (
        <div>
            <h2 className="page-header">
                Nhà cung cấp
            </h2>
            <Button type="button">
                <a href="./AddSupplier">
                    Thêm nhà cung cấp
                </a>
            </Button>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <table className='table table-striped table-hover table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Mã nhà cung cấp</th>
                                        <th>Tên nhà cung cấp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {supplier.map((item) =>
                                        <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td style={{ minWidth: 100 }}>
                                                <Button><Link to={`/admin/editsupplier/${item._id}`}>Sửa</Link></Button>|
                                                <Button><Link to={`/admin/deletesupplier/${item._id}`}>Xóa</Link></Button>|
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

export default Suppliers
