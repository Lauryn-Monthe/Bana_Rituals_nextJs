'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    img: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: { id: string; name: string; price: number; img: string }) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, newQuantity: number) => void;
    clearCart: () => void;
}

// 2. Création du Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("shopping-cart");
        if (saved) setCart(JSON.parse(saved));
    }, []);

    const addToCart = (product: { id: string; name: string; price: number; img: string }) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex(item => item.id === product.id);
            let updatedCart;
            if (existingIndex > -1) {
                updatedCart = [...prevCart];
                updatedCart[existingIndex].quantity += 1;
            } else {
                updatedCart = [...prevCart, { ...product, quantity: 1 }];
            }
            localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        );
        setCart(updatedCart);
        localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("shopping-cart");
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider");
    }
    return context;
};