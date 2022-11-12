import React, { useState, useEffect } from 'react'

import axios from 'axios'

import Button from '../../../components/Button/Button'

import { Link, useParams } from 'react-router-dom'

import TextInput from '../../../components/Input/TextInput'

import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const [dataProduct, setDataProduct] = useState([])
  const [categoryproduct, setCategoryProduct] = useState([]);

  const [categoryproductid, setCategoryProductId] = useState(dataProduct.categoryproductid);
  const [name, setName] = useState(dataProduct.name);
  const [price, setPrice] = useState(dataProduct.price);
  const [image, setImage] = useState(dataProduct.image);
  const [describe, setDescribe] = useState(dataProduct.describe);
  const [status, setStatus] = useState(dataProduct.status);

  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:8000/product/${id}`).then((res) => {
        setDataProduct(res.data);
        setCategoryProductId(res.data.categoryproductid._id);
        setStatus(res.data.status);
        setImage(`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(res.data.image.data.data)))}`)
      })
  }, [])
  useEffect(() => {
    axios
      .get(`http://localhost:8000/category`).then((res) => {
        setCategoryProduct(res.data);
      })
  }, [])

  const editProduct = async (e) => {
    e.preventDefault();
    const edit = await axios.put(`http://localhost:8000/product/${id}`, { categoryproductid, name, price, image, describe, status });
    if (edit) {
      navigate("/admin/products");
    } else {
      alert(`Sửa ko thanh cong!!!`);
    }
  };

  return (
    <div className="font-googleSansRegular">
      <form onSubmit={editProduct}>
        <h1 className="font-googleSansBold mb-10 uppercase text-primary text-[24px]">
          Chỉnh sửa sản phẩm
        </h1>
        <div>
          <select
            onChange={(e) => setCategoryProductId(e.target.value)}
            value={categoryproductid}
          >
            {categoryproduct.map((item) => <option value={item._id}>{item.name}</option>)}
          </select>
          <TextInput
            placeholder={'Tên sản phẩm'}
            type="text"
            required={'required'}
            onChange={(e) => setName(e.target.value)}
            defaultValue={dataProduct.name}
            className="block w-[400px]"
          />
          <br />
          <div>
            <h1>Hình ảnh</h1>
            {image ? (
              <div>
                <img src={image} height="300" width="300" />
                <br />
              </div>
            ) : (
              ""
            )}
            <input
              type="file"
              id="file"
              accept=".png"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <TextInput
            placeholder={'Giá'}
            type="text"
            required={'required'}
            onChange={(e) => setPrice(e.target.value)}
            defaultValue={dataProduct.price}
            className="block w-[400px]"
          />
          <br />
          <TextInput
            placeholder={'Tên sản phẩm'}
            type="text"
            required={'required'}
            onChange={(e) => setDescribe(e.target.value)}
            defaultValue={dataProduct.describe}
            className="block w-[400px]"
          />
          <br />
          <select
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="true">Đang kinh doanh</option>
            <option value="false">dừng kinh doanh</option>
          </select>
          <br />
        </div>
        <div>
          <Button type="button" btnCSS={'h-[44px] mr-2'} icon="edit">
            <a className="hover:text-white" onClick={editProduct}>Sửa</a>
          </Button>
          <Button type="button" btnCSS={'h-[44px]'} icon="navigate_before">
            <a className="hover:text-white" href="../Products">Quay về</a>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
