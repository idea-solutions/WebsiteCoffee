import React, { useState, useEffect } from 'react'

import axios from 'axios'

import logo from '../../../assets/images/icon.png'

import { Link } from 'react-router-dom'

import Button from '../../../components/Button/Button'

const Rate = () => {
    const [rate, setRate] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/rate').then((res) => {
            setRate(res.data)
        })
    }, [])
    return (
        <div className="font-googleSansRegular">
            <h2 className="font-googleSansBold mb-10 uppercase text-primary text-[24px]">
                Đánh giá
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <table className='table table-striped table-hover table-bordered'>
                                <thead>
                                    <tr>

                                        <th>Mã sản phẩm</th>
                                        <th>Mã User</th>
                                        <th>Điểm</th>
                                        <th>Nội dung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rate.map((item) =>
                                        <tr key={item._id}>
                                            <td>{item.productid}</td>
                                            <td>{item.usertid}</td>
                                            <td>{item.point}</td>
                                            <td>{item.content}</td>
                                            <td style={{ minWidth: 100 }}>
                                                <Button icon="edit" btnCSS={'h-11 mr-2'}><Link className="hover:text-white" to={`/admin/editrate/${item._id}`}>Sửa</Link></Button>|
                                                <Button icon="delete" btnCSS={'h-11'}><Link className="hover:text-white" to={`/admin/deleterate/${item._id}`}>Xóa</Link></Button>|
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

export default Rate
