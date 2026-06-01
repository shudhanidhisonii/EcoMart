import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setCart } from '@/redux/productSlice'

const ProductDesc = ({ product }) => {

  const accessToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch()

  const addToCart = async (productId) => {
    try {

      const res = await axios.post(
        'https://eco-mart-r73h.onrender.com/api/v1/cart/add',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (res.data.success) {

        console.log("TOKEN 👉", accessToken)

        toast.success('Product added to cart')

        dispatch(setCart(res.data.cart))
      }

    } catch (e) {
      console.log(e)
    }
  }

  return (

    <div className='flex flex-col gap-4'>

      {/* PRODUCT NAME */}
      <h1 className='font-bold text-4xl text-gray-800'>
        {product.productName}
      </h1>

      {/* CATEGORY + BRAND */}
      <p className='text-gray-800'>
        {product.category} | {product.brand}
      </p>

      {/* PRICE */}
      <h2 className='text-[#16a34a] font-bold text-2xl'>
        ₹{product.productPrice}
      </h2>

      {/* DESCRIPTION */}
      <p className='line-clamp-12 text-muted-foreground'>
        {product.productDesc}
      </p>

      {/* QUANTITY */}
      <div className='flex gap-2 items-center w-[300px]'>

        <p className='text-gray-800 font-semibold'>
          Quantity :
        </p>

        <Input
          type='number'
          className='w-14 border-[#16a34a] focus-visible:ring-[#16a34a]'
          defaultValue={1}
          min={1}
        />

      </div>

      {/* BUTTON */}
      <Button
        onClick={() => addToCart(product._id)}
        className='bg-[#16a34a] hover:bg-[#15803d] text-white w-max px-8 py-6 text-base font-semibold rounded-md transition-all duration-200'
      >
        Add to Cart
      </Button>

    </div>
  )
}

export default ProductDesc