import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Script from "next/script";
import CartFlyout, {CartBadgeCount} from "../components/cartFlyout";
import {CartProvider} from "./context/cartContext";

export const metadata: Metadata = {
    title: "Bana Rituals",
    description: "Discover the world of Bana Rituals. Haircare products to bring out the beauty of your hair.",
    openGraph: {
        type: "website",
        url: "https://bana-rituals.com/",
        title: "Bana Rituals",
        description: "Discover the world of Bana Rituals. Haircare products to bring out the beauty of your hair.",
        images: [{ url: "https://bana-rituals.com/assets/img/touch-icon.png" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Bana Rituals",
        description: "Discover the world of Bana Rituals. Haircare products to bring out the beauty of your hair.",
        images: ["https://bana-rituals.com/assets/img/touch-icon.png"],
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
        <head>
            <link href="/assets/img/favicon.png" rel="icon" />
            <link href="/assets/img/touch-icon.png" rel="apple-touch-icon" />
            {/* Styles */}
            <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Inter&family=Quicksand&display=swap" rel="stylesheet" />
            <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
            <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
            <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />
            <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
            <link href="/assets/css/main.css" rel="stylesheet" />
        </head>

        <body className="index-page">
        <CartProvider>
            <header id="header" className="header position-relative">
                <div className="main-bar">
                    <div className="container-fluid container-xl">
                        <div className="row align-items-center gy-2">
                            <div className="col-auto">
                                <a href="/" className="logo d-flex align-items-center">
                                    <i className="bi bi-cart2"></i>
                                    <h1 className="sitename">Bana Rituals</h1>
                                </a>
                            </div>
                            <div className="col-auto ms-auto ms-lg-0">
                                <div className="action-group d-flex align-items-center">
                                    <div className="dropdown">
                                        <button className="action-btn" data-bs-toggle="dropdown" aria-label="Cart">
                                            <i className="bi bi-bag"></i>
                                            <CartBadgeCount />
                                        </button>
                                        <CartFlyout />
                                    </div>
                                    {/* Toggle Menu Mobile */}
                                    <i className="mobile-nav-toggle d-xl-none bi bi-list me-0"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-strip">
                    <div className="container-fluid container-xl position-relative">
                        <nav id="navmenu" className="navmenu">
                            <ul>
                                <li><a href="/" className="active">Home</a></li>
                                <li><a href="/category">All Products</a></li>
                                <li><a href="/cart">Cart</a></li>
                                <li><a href="/checkout">Checkout</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            {children}

            <footer id="footer" className="footer">
                <div className="footer-newsletter">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2>Join Our Newsletter</h2>
                                <form action="forms/newsletter.php" method="post" className="php-email-form">
                                    <div className="newsletter-form d-flex">
                                        <input type="email" name="email" placeholder="Your email address" required />
                                        <button type="submit">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-main">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="footer-widget footer-about">
                                    <a href="/" className="logo"><span className="sitename">Bana Rituals</span></a>
                                    <div className="footer-contact mt-4">
                                        <div className="contact-item"><i className="bi bi-geo-alt"></i> <span>Germany</span></div>
                                        <div className="contact-item"><i className="bi bi-telephone"></i> <span>+49 1772667579</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="footer-widget"><h4>Contact Us</h4></div>
                                <div className="social-links mt-4">
                                    <div className="social-icons">
                                        <a href="https://wa.me/491772667579" aria-label="Whatsapp"><i className="bi bi-whatsapp"></i></a>
                                        <a href="https://www.facebook.com/share/1GvNVnvQqq/" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                                        <a href="https://www.instagram.com/bana_rituals" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                                        <a href="https://www.tiktok.com/@bana_rituals?_r=1&_t=ZG-96xYv7eIxST" aria-label="TikTok"><i className="bi bi-tiktok"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="payment-methods d-flex align-items-center justify-content-center">
                            <span>We Accept:</span>
                            <div className="payment-icons">
                                <i className="bi bi-bank" aria-label="Revolut"></i>
                                <i className="bi bi-paypal" aria-label="PayPal"></i>
                            </div>
                        </div>
                        <div className="copyright text-center">
                            <p>© <span>Copyright</span> <strong className="sitename">Bana Rituals</strong>. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
            <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
            <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
            <Script src="/assets/vendor/glightbox/js/glightbox.min.js" strategy="lazyOnload" />
            <Script src="/assets/js/main.js" strategy="afterInteractive" />
            <Script src="/assets/vendor/drift-zoom/Drift.min.js" />
        </CartProvider>
        </body>
        </html>
    );
}