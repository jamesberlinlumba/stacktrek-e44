import { useLocation } from 'wouter'

import { useAppContext } from '../contexts/CartContext'
import './NavBar.css'

const NavBar = () => {
    const [ _, setLocation ] = useLocation()
    const { cart } = useAppContext()

    return (
        <div className="navBar">
            <h3 onClick={ () => {setLocation('/')} }>E-Commerce</h3>
            <a onClick={ () => {setLocation('/cart')} }>Cart{cart.length > 0 ? ` (${cart.length})` : ''}</a>
        </div>
    )
}

export default NavBar