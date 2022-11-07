import React, { useState, useEffect } from 'react'

import axios from 'axios'

import logo from '../../../assets/images/icon.png'

import { Link } from 'react-router-dom'

import Button from '../../../components/Button/Button'

const ProductCategories = () => {
  const [id, setId] = useState('')
  const [productCategory, setProductCategory] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/category').then((res) => {
      setProductCategory(res.data)
    })
  }, [])
  return (
    <div className="font-googleSansRegular">
      <h1 className="font-googleSansBold mb-10 uppercase text-primary text-[24px]">
        Loại sản phẩm
      </h1>
      <Button
        btnStyle={'btn-outline'}
        type="button"
        btnCSS={'h-11 mb-10'}
        icon="add"
      >
        <Link className="hover:text-white" to="../addproductcategory">
          Thêm loại sản phẩm
        </Link>
      </Button>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Mã loại</th>
                    <th>Tên loại</th>
                  </tr>
                </thead>
                <tbody>
                  {productCategory.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td style={{ minWidth: 100 }}>
                        <Button
                          type="button"
                          btnCSS={'h-11 mr-2'}
                          icon="edit"
                        >
                          <Link
                            className="hover:text-white"
                            to={'../EditProductCategory/' + item._id}
                          >
                            Sửa
                          </Link>
                        </Button>
                        <Button
                          type="button"
                          btnCSS={'h-11'}
                          icon="delete"
                        >
                          <Link
                            className="hover:text-white"
                            to={'../DeleteProductCategory/' + item._id}
                          >
                            Xóa
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
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
