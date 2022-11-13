import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Header from '../Header/Header'
import Button from '../Button/Button'
import ItemCard from './ItemCard'
import { ListProductContext } from '../../context/ListProductContext'
import Footer from '../Footer/Footer'
import Rating from '@mui/material/Rating'

const ItemDetail = () => {
  const { id } = useParams()
  const [star, setStar] = React.useState(0)
  const [info, setInfo] = useState([])
  const [image, setImage] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/product/${id}`)
      .then((res) => {
        setInfo(res.data);
        setImage(`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(res.data.image.data.data)))}`);
      })
  }, [id])

  const [product, setProduct] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/product').then((res) => {
      setProduct(res.data)
    })
  }, [])

  const { addProduct } = useContext(ListProductContext)

  const add = (e) => {
    e.preventDefault()
    const id = info._id
    const name = info.name
    const price = info.price
    const amount = 1
    const product = { id, name, price, amount }
    addProduct(product)
  }

  return (
    <div className="relative pb-24 lg:pb-12 min-h-screen">
      <Header />
      <div className="h-20"></div>
      <div className="sm:mx-5 md:mx-[50px] lg:mx-[100px] xl:mx-[150px] font-googleSansRegular">
        <div className="grid grid-cols-2 md:gap-10 sm:gap-8">
          <img
            className="rounded-[1.5rem] hover:rounded-[2rem] transition-all"
            src={image}
            alt="product-thumbnail"
          />
          <div className="pt-5">
            <p className="text-[26px] mb-[18px] text-black leading-6">
              {info.name}
            </p>
            <div className="text-base mt-4">
              <span className="text-[26px] font-semibold mr-[37px]">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(info.price)}
              </span>
            </div>
            <div className="mt-6">
              <h2 className="t1 mb-2">Kích cỡ</h2>
              <Button
                btnStyle="btn-outline"
                icon={''}
                btnCSS={'h-3 mr-2 font-semibold'}
              >
                S
              </Button>
              <Button
                btnStyle="btn-outline"
                icon={''}
                btnCSS={'h-3 mr-2 font-semibold'}
              >
                M
              </Button>
              <Button
                btnStyle="btn-outline"
                icon={''}
                btnCSS={'h-3 font-semibold'}
              >
                L
              </Button>
            </div>
            <div className="items-center mt-10">
              <Button
                type="button"
                btnStyle="btn-fill"
                icon="add_shopping_cart"
                onClick={add}
                btnCSS={'h-[44px] px-6 py-5'}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h4 className="text-[18px] mb-2 font-semibold">Mô tả sản phẩm</h4>
          <p className="leading-6 text-[14px] font-normal">
            {info.describe}
          </p>
        </div>
        {/* Rating */}
        <div className="mt-16">
          <h4 className="text-[18px] mb-2 font-semibold">Đánh giá sản phẩm</h4>
          {/* Star */}
          <div className="my-5">
            <Rating
              size="large"
              name="simple-controlled"
              value={star}
              onChange={(event, newValue) => {
                setStar(newValue)
              }}
            />
          </div>
          {/* Content */}
          <div>
            <textarea
              name="content"
              placeholder="Nội dung"
              className="border-[1px] border-outline-var border-solid rounded-3xl text-[18px] leading-[24px] mb-[10px] pt-[13px] px-[12px] pb-[13px] hover:border-outline focus:border-[1px] hover:rounded-2xl focus:border-outline focus:rounded-2xl transition-all w-full min-h-[200px] max-h-[200px]"
            />
          </div>
          <div className="text-right">
            <Button
              btnStyle={'btn-fill'}
              icon=""
              btnCSS={'h-[44px] px-6 py-5'}
              onClick={''}
            >
              Đăng
            </Button>
          </div>
          {/* End Content */}
        </div>
        {/* Relate */}
        <div className="my-16">
          <h4 className="text-[18px] mb-2 font-semibold">Sản phẩm liên quan</h4>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {product.map((item) => (
              <Link to={'/product/' + item._id}>
                <ItemCard
                  key={item._id}
                  title={item.name}
                  price={item.price}
                  image={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(item.image.data.data)))}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ItemDetail
