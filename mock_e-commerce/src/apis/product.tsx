export const getProducts = () =>
    fetch("https://fakestoreapi.com/products").then(res => res.json())

export const getProduct = (id: string | undefined) =>
    fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json())