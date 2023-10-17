import { addToCart, clearCart } from '@/redux/features/cartSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function ProductActionButtonsContainer({ productIdParam }: any) {
    // states
    const { size, color } = useAppSelector(store => store.product)
    const { user } = useAppSelector(store => store.user)

    // hooks
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const addToTheCart = () => {
        dispatch(addToCart({ productId: productIdParam, size: size, color: color }))
    }
    const buyItems = () => {
        if (!!size && !!color) {
            dispatch(clearCart())
            dispatch(addToCart({ productId: productIdParam, size: size, color: color }))
            if (!user.name) {
                router.push("/login")
                toast.warn("Please login to buy any product")
                return;
            }
            router.push("/checkout")
        } else {
            toast.warn("Please select color and size")
        }
    }
    return (
        <div className="flex gap-3">
            <button className="flex w-1/2 items-center justify-center text-white bg-blue-900 border-0 py-3 px-6 focus:outline-none hover:bg-blue-700 rounded" onClick={addToTheCart}>Add to cart</button>
            <button className="flex w-1/2 items-center justify-center text-white bg-blue-900 border-0 py-3 px-6 focus:outline-none hover:bg-blue-700 rounded" onClick={buyItems}>Buy now</button>
        </div>
    )
}

export default ProductActionButtonsContainer