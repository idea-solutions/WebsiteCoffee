import React, { useState, useEffect, useContext } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Button/Button'
import { ListProductContext } from '../../context/ListProductContext'
import './cart.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const Cart = () => {
  const { products, delProduct, upAmount, downAmount, clearCart } = useContext(ListProductContext)
  const navigate = useNavigate()
  const [price, setPrice] = useState(0)
  const [userid, setUserId] = useState("");
  useEffect(() => {
    setUserId(localStorage.getItem("token") ? (jwt_decode(localStorage.getItem("token")).id) : (``));
  }, [])
  useEffect(() => {
    let ans = 0
    products.map((item) => (ans += item.amount * item.price))
    setPrice(ans)
  })

  const addOrder = async () => {
    if (!localStorage.getItem("token")) {
      alert('Ban chua dang nhap, moi dang nhap!!!');
      return navigate('/signin');
    }
    const rec = await axios.post('http://localhost:8000/receipt', {
      userid,
      price,
      products,
    })
    if (rec) {
      alert('Thanh toan thanh cong!')
      clearCart()
      navigate('/')
    } else {
      alert('Thanh toan that bai!!!')
      navigate('/')
    }
  }

  const orderList = products.map((n) => (
    <tr key={n.id}>
      <td>{n.name}</td>
      <td>
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(n.price)}
      </td>
      <td>
        <div className="flex h-[47px]">
          <button onClick={() => downAmount(n.id)}>
            <span className="material-symbols-rounded">remove</span>
          </button>
          <input
            className="mx-2 rounded-full hover:text-black focus:text-black text-center w-20 h-10 bg-[transparent]"
            type="text"
            value={n.amount}
          />
          <button onClick={() => upAmount(n.id)}>
            <span className="material-symbols-rounded">add</span>
          </button>
        </div>
      </td>
      <td className="lowercase">
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(n.price * n.amount)}
      </td>
      <td>
        <Button
          onClick={() => delProduct(n.id)}
          btnStyle="btn-outline"
          icon="delete"
          btnCSS="h-[12px] w-[64px] px-0 leading-3 text-[13px]"
          type="button"
          children=""
        />
      </td>
    </tr>
  ))
  const formorderList = (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá bán</th>
            <th>Số lượng</th>
            <th>Tổng tiền (1 sản phẩm)</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>{orderList}</tbody>
      </table>
      <h1 className="mt-10 mb-5">
        Tồng tiền:{' '}
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(price)}
      </h1>
      <Button
        type="button"
        btnStyle="btn-fill"
        icon="payments"
        onClick={addOrder}
        btnCSS={'h-[47px] px-6 py-3'}
      >
        Thanh toán
      </Button>
    </div>
  )

  const cartEmpty = (
    <h3 className="text-center font-googleSansMedium">Giỏ hàng rỗng</h3>
  )

  return (
    <div className="font-googleSansRegular">
      <Header />
      <div className="mt-10 mx-[-15px] sm:mx-5 md:mx-[50px] lg:mx-[100px] xl:mx-[150px]">
        {products.length != 0 ? formorderList : cartEmpty}
      </div>
      <Footer />
    </div>
  )
}

export default Cart
