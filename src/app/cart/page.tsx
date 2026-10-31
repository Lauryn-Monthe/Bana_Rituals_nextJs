'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {useCart} from "../context/cartContext";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = subtotal;

    return (
        <main className="main">
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">Cart</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li><Link href="/">Home</Link></li>
                            <li className="current">Cart</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section id="cart" className="cart section">
                <div className="container">
                    <div className="row gy-5">
                        <div className="col-lg-8">
                            <div className="cart-table">
                                <div className="table-head d-none d-md-flex row align-items-center">
                                    <div className="col-md-5">Product</div>
                                    <div className="col-md-2 text-center">Price</div>
                                    <div className="col-md-3 text-center">Quantity</div>
                                    <div className="col-md-2 text-end">Total</div>
                                </div>

                                <div id="cart-table-body">
                                    {cart.length === 0 ? (
                                        <div className="text-center p-5">
                                            <i className="bi bi-basket3 display-3 text-muted"></i>
                                            <p className="mt-3 fs-5">Your shopping cart is empty.</p>
                                            <Link href="/category" className="btn btn-dark mt-2">Resume Browsing</Link>
                                        </div>
                                    ) : (
                                        cart.map((item) => (
                                            <div key={item.id} className="cart-item" data-id={item.id}>
                                                <div className="row align-items-center g-3">
                                                    <div className="col-md-5">
                                                        <div className="product-info d-flex align-items-center gap-3">
                                                            <div className="product-img"><img src={item.img} className="img-fluid" alt={item.name} /></div>
                                                            <div className="product-meta">
                                                                <h6 className="product-title">{item.name}</h6>
                                                                <div className="product-tags"><span className="tag-item">Standard Edition</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 col-6">
                                                        <div className="price-col text-md-center"><span className="current-price">{item.price.toFixed(2)}€</span></div>
                                                    </div>
                                                    <div className="col-md-3 col-6">
                                                        <div className="qty-col d-flex justify-content-md-center">
                                                            <div className="quantity-selector">
                                                                <button className="quantity-btn decrease" type="button" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}><i className="bi bi-dash"></i></button>
                                                                <input type="number" className="quantity-input" value={item.quantity} readOnly />
                                                                <button className="quantity-btn increase" type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}><i className="bi bi-plus"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 col-6">
                                                        <div className="total-col text-md-end"><span className="row-total">{(item.price * item.quantity).toFixed(2)}€</span></div>
                                                    </div>
                                                </div>
                                                <button className="remove-btn remove-item-btn" type="button" onClick={() => removeFromCart(item.id)}><i className="bi bi-trash3"></i></button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {cart.length > 0 && (
                                <div className="cart-actions d-flex justify-content-between align-items-center">
                                    <Link href="/category" className="action-link"><i className="bi bi-arrow-left"></i> Resume Browsing</Link>
                                    <button className="action-clear" id="clear-all-btn" type="button" onClick={clearCart}><i className="bi bi-trash3"></i> Clear All</button>
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="col-lg-4">
                                <div className="summary-card">
                                    <div className="summary-header">
                                        <h5>Order Summary</h5>
                                        <span className="items-count" id="summary-items-count">{totalItems} item{totalItems > 1 ? 's' : ''}</span>
                                    </div>

                                    <div className="summary-body">
                                        <div className="coupon-section">
                                            <label className="coupon-label">Discount Code</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="coupon-input" placeholder="Enter coupon" />
                                                <button className="btn coupon-btn" type="button" id="coupon-btn">Confirm</button>
                                            </div>
                                        </div>

                                        <div className="summary-lines">
                                            <div className="summary-row">
                                                <span className="label-text">Subtotal</span>
                                                <span className="value-text" id="summary-subtotal">{subtotal.toFixed(2)}€</span>
                                            </div>
                                        </div>

                                        <div className="summary-total">
                                            <span>Total</span>
                                            <span className="total-value" id="summary-total-value">{total.toFixed(2)}€</span>
                                        </div>

                                        <Link href="/checkout" className="btn proceed-btn">
                                            Proceed to Checkout <i className="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}