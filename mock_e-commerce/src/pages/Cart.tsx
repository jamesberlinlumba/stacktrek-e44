import { useAppContext } from "../contexts/CartContext"
import { getCart, updateItemQuantity } from "../apis/cart"

import './Cart.css'

const Cart = () => {
    const { cart, dispatch } = useAppContext()

    return(
        <>
            { cart.map(item =>
                <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.category} />
                    <section className="description">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <p>$ {item.price}</p>
                    </section>
                    <section className="action">
                        <p>
                            {`x${item.quantity}   `}
                            <button onClick={() => {
                                updateItemQuantity(item.id, 1).then(async () => { dispatch({ type: 'updateCart', cart: await getCart() }) })
                            }}>+</button>
                            <button onClick={() => {
                                updateItemQuantity(item.id, -1).then(async () => { dispatch({ type: 'updateCart', cart: await getCart() }) })
                            }}>-</button>
                        </p>
                        <p>$ {(item.price * item.quantity).toFixed(2)}</p>
                    </section>
                </div>
            )}
            { cart.length > 0 ?
                <div className="total-amount">
                    <p>$ {cart.map(item => item.price * item.quantity).reduce((total, item) => total + item).toFixed(2)}</p>
                </div>
                :
                <p>Empty</p>
            }
        </>
    )
}

export default Cart