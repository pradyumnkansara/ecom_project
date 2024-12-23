import React, { createContext, useEffect, useState } from 'react'

let adminContext = createContext()

export default function AdminContext(props) {
    let [changeMenu, setchangeMenu] = useState(false)
    let [cart,setCart]=useState([])

     // Load cart from local storage when the component mounts
     useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Save cart to local storage whenever it updates
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <>
            <adminContext.Provider value={{changeMenu,setchangeMenu,cart,setCart}}>
                {props.children}
            </adminContext.Provider>
        </>
    )
}

export {adminContext};