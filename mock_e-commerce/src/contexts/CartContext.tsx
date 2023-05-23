import { createContext,
    FunctionComponent,
    PropsWithChildren,
    useReducer,
    useContext,
    useEffect } from 'react'

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
    products: ProductType[],
    productsMap: Map<string, Set<number>>,
    cart: CartItem[],
    searchResult: ProductType[]
}

type Action =
    | { type: 'updateProducts', products: ProductType[] }
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

const appReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'updateProducts': {
            if (state.products.length > 0) {
                return state
            }

            const productsMap = new Map();

            for (let product of action.products) {
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

            return state = {
                products: action.products,
                productsMap: productsMap,
                cart: state.cart,
                searchResult: action.products
            }
        }
        case 'updateCart': {
            return state = {
                products: state.products,
                productsMap: state.productsMap,
                cart: action.cart,
                searchResult: state.searchResult
            }
        }
        case 'search': {
            if (action.text === '') {
                return state = {
                    products: state.products,
                    productsMap: state.productsMap,
                    cart: state.cart,
                    searchResult: state.products
                }
            }

            let searchResult: ProductType[] = []

            for (let word of action.text.toLowerCase().split(/\W+/)) {
                const entries = state.productsMap.get(word)
                if (entries !== undefined) {
                    for (let entry of entries) {
                        if (!searchResult.map(item => item.id).includes(entry)) {
                            const found = state.products.find((item: ProductType) => item.id === entry)
                            if (found !== undefined) {
                                searchResult = [ ...searchResult, found]
                            }
                        }
                    }
                }
            }

            return state = {
                products: state.products,
                productsMap: state.productsMap,
                cart: state.cart,
                searchResult: searchResult
            }
        }
    }
}

export const AppProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, { products: [], productsMap: new Map(), cart: [], searchResult: [] })

    useEffect(() => {
        if (state.products.length < 1) {
            getProducts().then(products => { dispatch({ type: 'updateProducts', products: products }) })
        }
        getCart().then(cart => { dispatch({ type: 'updateCart', cart: cart }) })
    }, [])
    
    return (
        <AppContext.Provider value={{ cart: state.cart, searchResult: state.searchResult, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext<Context>(AppContext)
