'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {useCart} from "../context/cartContext";
import {createCartRequest} from "../../services/cartSrvc";

export default function CheckoutPage() {
    const { cart } = useCart();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [shipping, setShipping] = useState(6.99);
    const [loading, setLoading] = useState(false);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shipping;

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);

        if (selectedCountry === 'DE') {
            setShipping(6.99);
        } else {
            setShipping(14.49);
        }
    };

    async function handlePlaceOrder(e: React.FormEvent) {
        e.preventDefault();

        if (!country) {
            alert("Please select a country.");
            return;
        }

        setLoading(true);

        const itemsPayload = cart.map(item => ({
            itemId: item.id,
            quantity: item.quantity,
            price: item.price,
        }));

        const result = await createCartRequest({
            country: "DE",
            guestEmail: email,
            guestName: `${firstName} ${lastName}`,
            cartItemsFromFront: itemsPayload
        });

        setLoading(false);

        if (!result) {
            setLoading(false);
            alert("Erreur lors de la création du panier");
            return;
        }

        localStorage.setItem('orderId', result.orderId);
        alert(`Commande #${result.orderId} initialisée ! Total validé par serveur : ${result.total}€`);
    }

    return (
        <main className="main">
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">Checkout</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li><Link href="/">Home</Link></li>
                            <li className="current">Checkout</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section id="checkout" className="checkout section">
                <div className="container">
                    <div className="row g-4">
                        {/* LEFT FORM */}
                        <div className="col-lg-7 order-lg-1 order-2">
                            <div className="checkout-card">
                                <form className="checkout-form" onSubmit={handlePlaceOrder}>

                                    {/* Contact Information */}
                                    <div className="form-section" id="contact-info">
                                        <div className="section-label">
                                            <span className="label-icon"><i className="bi bi-person"></i></span>
                                            <div><h3>Contact Information</h3><p>Provide your personal details for this order.</p></div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-sm-6 field-group">
                                                <label htmlFor="c-fname">First Name</label>
                                                <input type="text" className="form-control" id="c-fname" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                            </div>
                                            <div className="col-sm-6 field-group">
                                                <label htmlFor="c-lname">Last Name</label>
                                                <input type="text" className="form-control" id="c-lname" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                            </div>
                                            <div className="col-sm-6 field-group">
                                                <label htmlFor="c-email">Email</label>
                                                <input type="email" className="form-control" id="c-email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="col-sm-6 field-group">
                                                <label htmlFor="c-phone">Phone</label>
                                                <input type="tel" className="form-control" id="c-phone" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="section-divider" />

                                    {/* Shipping Address */}
                                    <div className="form-section" id="ship-address">
                                        <div className="section-label">
                                            <span className="label-icon"><i className="bi bi-geo-alt"></i></span>
                                            <div><h3>Shipping Address</h3></div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-sm-8"><label htmlFor="c-street">Street Address</label><input type="text" className="form-control" id="c-street" required /></div>
                                            <div className="col-sm-4"><label htmlFor="c-apt">Apt / Suite</label><input type="text" className="form-control" id="c-apt" /></div>
                                            <div className="col-sm-4"><label htmlFor="c-city">City</label><input type="text" className="form-control" id="c-city" required /></div>
                                            <div className="col-sm-4"><label htmlFor="c-state">State</label><input type="text" className="form-control" id="c-state" required /></div>
                                            <div className="col-sm-4"><label htmlFor="c-zip">ZIP Code</label><input type="text" className="form-control" id="c-zip" required /></div>
                                            <div className="col-12">
                                                <label htmlFor="c-country">Country</label>
                                                <select className="form-select" id="c-country" required value={country} onChange={handleCountryChange}>
                                                    <option value="">Select a country</option>
                                                    <option value="DE">Germany</option>
                                                    <option value="FR">EU (EU countries)</option>
                                                    <option value="DE">Switzerland</option>
                                                    <option value="DE">England</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="section-divider" />

                                    {/* Payment Method */}
                                    <div className="form-section" id="pay-section">
                                        <div className="section-label">
                                            <span className="label-icon"><i className="bi bi-credit-card"></i></span>
                                            <div><h3>Payment Method</h3></div>
                                        </div>
                                        <div className="method-tabs d-flex gap-2">
                                            <label className="method-tab active"><input type="radio" name="pay" value="Revolut" defaultChecked /><span className="tab-inner"><i className="bi bi-credit-card-2-front"></i> Revolut</span></label>
                                            <label className="method-tab"><input type="radio" name="pay" value="PayPal" /><span className="tab-inner"><i className="bi bi-paypal"></i> PayPal</span></label>
                                        </div>
                                    </div>

                                    <hr className="section-divider" />

                                    <button type="submit" className="btn place-order-btn w-100">
                                        {loading ? (
                                            <span>Processing your order...</span>
                                        ) : (
                                            <>
                                                <i className="bi bi-lock-fill me-2"></i>Place Order — {total.toFixed(2)}€
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* RIGHT SUMMARY */}
                        <div className="col-lg-5 order-lg-2 order-1">
                            <div className="order-summary-card">
                                <h3>Order Summary</h3>
                                <div className="summary-products">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flyout-item d-flex align-items-center mb-3">
                                            <div className="flyout-item-thumb me-3"><img src={item.img} alt={item.name} width="60" /></div>
                                            <div className="flyout-item-details flex-grow-1">
                                                <h6 className="m-0">{item.name}</h6>
                                                <div className="d-flex justify-content-between"><span className="text-muted">x{item.quantity}</span><span className="fw-bold">{(item.price * item.quantity).toFixed(2)}€</span></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="cost-breakdown">
                                    <div className="d-flex justify-content-between"><span>Subtotal</span><span>{subtotal.toFixed(2)}€</span></div>
                                    <div className="d-flex justify-content-between"><span>Shipping</span><span>{shipping.toFixed(2)}€</span></div>
                                    <div className="cost-total d-flex justify-content-between mt-2"><span>Total</span><span>{total.toFixed(2)}€</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}