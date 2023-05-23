import { useLocation } from 'wouter'

import { getCart, addToCart } from "../apis/cart.tsx"
import { useAppContext } from "../contexts/CartContext.tsx"
import './Products.css'

const Products = () => {
    const [_, setLocation] = useLocation()
    const { searchResult, dispatch } = useAppContext()

    return (
        <>
            <input type='search'
                onChange={e => { dispatch({ type: 'search', text: e.target.value }) }}
                placeholder='Search'
                className='search' />
            <div className="products">
                <section>
                    { searchResult.length > 0 ? searchResult.map(product =>
                        <figure key={product.id}>
                            <img src={product.image}
                                alt={product.category}
                                onClick={() => {setLocation(`/product${product.id}`)}} />
                            <figcaption>$ {product.price}</figcaption>
                            <button onClick={() => {
                                addToCart(product).then(async () => { dispatch({ type: 'updateCart', cart: await getCart() }) })
                            }}>Add to cart</button>
                        </figure>
                        )
                        :
                        <p>No match result</p>
                    }
                </section>
            </div>
        </>
    )
}

export default Products