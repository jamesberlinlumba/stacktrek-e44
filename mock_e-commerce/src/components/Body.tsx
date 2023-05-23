import { Route, Switch } from "wouter"

import Products from '../pages/Products.js'
import Product from '../pages/Product.js'
import Cart from '../pages/Cart.js'
import './Body.css'

const Body = () => {
    return(
        <div className="body">
            <Switch>
                <Route path='/' component={Products} />
                <Route path='/product:id' component={Product} />
                <Route path='/cart' component={Cart} />
            </Switch>
        </div>
    )
}

export default Body