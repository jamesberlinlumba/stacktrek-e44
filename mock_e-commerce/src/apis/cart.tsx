import { ProductType } from "../contexts/CartContext"

export const getCart = () => fetch('/api/cart').then(res => res.json())

export const addToCart = (product: ProductType) =>
    fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })

export const updateItemQuantity = (id: number, action: number) =>
    fetch('/api/cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id, action})
    })