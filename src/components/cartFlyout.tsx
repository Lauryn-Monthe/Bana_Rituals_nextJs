'use client';
import React from 'react';
import Link from 'next/link';
import {useCart} from "../app/context/cartContext";

export function CartBadgeCount() {
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems === 0) return null;

    return <span className="badge-count">{totalItems}</span>;
}

export default function CartFlyout() {
    const { cart, removeFromCart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="dropdown-menu cart-flyout">
            <div className="flyout-top">
                <h6>Your Bag</h6>
                <span className="items-label">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
            </div>
            <div className="flyout-items">
                {cart.length === 0 ? (
                    <p className="text-center p-3 m-0 text-muted">Your bag is empty</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="flyout-item">
                            <div className="flyout-item-thumb">
                                <img src={item.img} alt={item.name} className="img-fluid" />
                            </div>
                            <div className="flyout-item-details">
                                <h6>{item.name}</h6>
                                <span className="item-option">Standard Edition</span>
                                <div className="item-bottom">
                                    <span className="item-price">{item.price.toFixed(2)}€</span>
                                    <span className="item-qty">x{item.quantity}</span>
                                </div>
                            </div>
                            <button className="item-dismiss" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                                <i className="bi bi-trash3"></i>
                            </button>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="flyout-bottom">
                    <div className="subtotal-row">
                        <span>Subtotal</span>
                        <span className="subtotal-value">{subtotal.toFixed(2)}€</span>
                    </div>
                    <Link href="/checkout" className="btn btn-proceed">Proceed to Checkout</Link>
                    <Link href="/cart" className="link-viewbag">View full bag →</Link>
                </div>
            )}
        </div>
    );
}