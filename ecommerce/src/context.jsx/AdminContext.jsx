import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

let adminContext = createContext();

export default function AdminContext(props) {
    let [changeMenu, setchangeMenu] = useState(false);
    let [cart, setCart] = useState([]);
    let [token, setToken] = useState(null);
    let [userId, setUserId] = useState(null); 

    // Load cart from local storage when the component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }

        // Load token from local storage or set it from another source
        const storedToken = localStorage.getItem('accessToken');
        const storedUserId = localStorage.getItem('userId');
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
        if (storedUserId) {
            setUserId(storedUserId); // Set the userId in state
        }
    }, []);

    // Save cart to local storage whenever it updates
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Set Axios defaults and authorization header
    axios.defaults.baseURL = 'http://localhost:8000'; // Set the base URL globally
    useEffect(() => {
        console.log(token,"adddddddddddddddddddddddddddd")
        if (token) {
            // Set the Authorization header if the token is available
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // Remove the Authorization header if the token is not available
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]); // Re-run whenever the token changes

    // Update the setToken function to include userId
    const setTokenWithId = (authToken, id) => {
        setToken(authToken);
        setUserId(id);
        localStorage.setItem('accessToken', authToken); // Save token to localStorage
        localStorage.setItem('userId', id); // Save userId to localStorage
    };

    // Reset context state (e.g., on logout)
    const resetContext = () => {
        setCart([]);
        setToken(null);
        setUserId(null); // Clear the userId
        localStorage.removeItem('cart');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId'); // Remove userId from localStorage
    };

    return (
        <>
            <adminContext.Provider value={{
                changeMenu,
                setchangeMenu,
                cart,
                setCart,
                token,
                setToken:setTokenWithId, 
                userId, 
                resetContext,
            }}>
                {props.children}
            </adminContext.Provider>
        </>
    );
}

export { adminContext };
