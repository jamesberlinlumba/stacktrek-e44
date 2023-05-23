import { FunctionComponent, useState } from 'react'
import { RouteComponentProps } from 'wouter'

import { getProduct } from '../apis/product.js'
import { getCart, addToCart } from '../apis/cart.js'
import { ProductType, useAppContext } from '../contexts/CartContext.js'
import './Product.css'

const Product: FunctionComponent<RouteComponentProps> = ({ params }) => {
    const [ product, setProduct ] = useState<ProductType>()
    const { dispatch } = useAppContext()

    getProduct(params.id).then(product => {setProduct(product)})

    return( product === undefined ?
        <></>
        :
        <div className='product'>
            <img src={product.image} alt={product.category} />
            <section>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>
                    $ {product.price}
                    <button onClick={() => { addToCart(product).then(async () => {
                        dispatch({ type: 'updateCart', cart: await getCart() })
                    }) }}>Add to cart</button>
                </p>
            </section>
        </div>
    )
}

export default Product