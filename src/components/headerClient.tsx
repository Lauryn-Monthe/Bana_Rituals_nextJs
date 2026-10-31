"use client";

import {CartProvider} from "../app/context/cartContext";
import CartFlyout, {CartBadgeCount} from "./cartFlyout";

export default function HeaderClient() {
    return (
        <CartProvider>
            <header id="header" className="header position-relative">
                {/* ton header ici */}
                <div className="dropdown">
                    <button className="action-btn">
                        <i className="bi bi-bag"></i>
                        <CartBadgeCount />
                    </button>
                    <CartFlyout />
                </div>
            </header>
        </CartProvider>
    );
}
