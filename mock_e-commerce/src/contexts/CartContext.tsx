import { createContext, FunctionComponent, PropsWithChildren, useReducer, useContext } from 'react'

import { getProducts } from '../apis/product'
import { getCart } from '../apis/cart'

export type ProductType = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

export type CartItem = {
    _id: string,
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
    quantity: number
}

type State = {
    cart: CartItem[],
    searchResult: ProductType[]
}

type Action =
    | { type: 'updateCart'; cart: CartItem[] }
    | { type: 'search', text: string }

type Dispatch = (action: Action) => void

type Context = { searchResult: ProductType[], cart: CartItem[]; dispatch: Dispatch }

const AppContext = createContext<Context>({
    searchResult: [],
    cart: [],
    dispatch: () => {
        throw new Error('dispatch must be overridden')
    }
})

const products = await getProducts()

const productsMap = new Map();

for (let product of products) {
    for (let word of product.title.toLowerCase().split(/\W+/)) {
        if (!productsMap.has(word)) {
            productsMap.set(word, new Set().add(product.id))
        } else {
            productsMap.get(word).add(product.id)
        }
    }
    for (let word of product.category.toLowerCase().split(/\W+/)) {
        if (!productsMap.has(word)) {
            productsMap.set(word, new Set().add(product.id))
        } else {
            productsMap.get(word).add(product.id)
        }
    }
}

const appReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'updateCart': {
            return { cart: action.cart, searchResult: state.searchResult }
        }
        case 'search': {
            if (action.text === '') {
                return { cart: state.cart, searchResult: products }
            }

            let searchResult: ProductType[] = []

            for (let word of action.text.toLowerCase().split(/\W+/)) {
                if (productsMap.has(word)) {
                    for (let entry of productsMap.get(word)) {
                        if (!searchResult.map(item => item.id).includes(entry)) {
                            searchResult = [ ...searchResult, products.find((item: ProductType) => item.id === entry)]
                        }
                    }
                }
            }

            return { cart: state.cart, searchResult: searchResult }
        }
    }
}

const initialCart = await getCart()

export const CartProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, { cart: initialCart, searchResult: products })

    return (
        <AppContext.Provider value={{ cart: state.cart, searchResult: state.searchResult, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext<Context>(AppContext)
