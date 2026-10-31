'use client';

import { useState, use } from 'react';
import { Item } from "../../../models/item";
import {getAllItems} from "../../../services/itemsSrcv";

const products: Item[] = await getAllItems();

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = products.find(p => p.id.toString() === id) || products[0];

    const [mainImage, setMainImage] = useState<string>(product.images[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'desc' | 'feedback'>('desc');
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

    const finalPrice = product.price - (product.price * ((product.discountPercent || 0) / 100));

    return (
        <main className="main">
            {/* Page Title */}
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">Product Details</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li><a href="index.html">Home</a></li>
                            <li className="current">Product Details</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Product Details Section */}
            <section id="product-details" className="product-details section">
                <div className="container">
                    <div className="row g-4">
                        {/* Product Gallery */}
                        <div className="col-lg-7">
                            <div className="image-showcase">
                                <div className="main-image-container">
                                    {product.discountPercent && <span className="discount-badge">-{product.discountPercent}%</span>}
                                    <img id="main-product-image" src={mainImage} className="img-fluid" alt={product.name} />
                                    <div className="image-zoom-container"></div>
                                    <button className="image-nav-btn prev-image" type="button"><i className="bi bi-chevron-left"></i></button>
                                    <button className="image-nav-btn next-image" type="button"><i className="bi bi-chevron-right"></i></button>
                                </div>
                                <div className="thumb-strip">
                                    {product.images.map((img, index) => (
                                        <div key={index} className={`thumb-cell thumbnail-item ${mainImage === img ? 'active' : ''}`} onClick={() => setMainImage(img)}>
                                            <img src={img} alt={`View ${index + 1}`} className="img-fluid" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="col-lg-5">
                            <div className="product-detail-card">
                                <div className="detail-header">
                                    <span className="stock-indicator"><i className="bi bi-circle-fill"></i> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                                </div>
                                <h1 className="product-heading">{product.name}</h1>
                                <div className="pricing-area">
                                    <div className="price-row">
                                        <span className="price-now">{finalPrice.toFixed(2)}€</span>
                                        <span className="price-was"><del>{product.price.toFixed(2)}€</del></span>
                                    </div>
                                    <span className="save-tag">Save {(product.price - finalPrice).toFixed(2)}€</span>
                                </div>
                                <p className="summary-text">{product.description}</p>
                                <div className="action-row">
                                    <div className="quantity-selector">
                                        <button className="quantity-btn decrease" type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}><i className="bi bi-dash"></i></button>
                                        <input type="number" className="quantity-input" value={quantity} readOnly />
                                        <button className="quantity-btn increase" type="button" onClick={() => setQuantity(q => q + 1)}><i className="bi bi-plus"></i></button>
                                    </div>
                                    <button type="button" className="btn primary-action-btn add-cart-btn" data-id={product.id} data-name={product.name} data-price={finalPrice.toFixed(2)} data-img={product.images[0]}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="info-tabs">
                                <ul className="tab-nav nav" role="tablist">
                                    <li><button className={`nav-link ${activeTab === 'desc' ? 'active' : ''}`} onClick={() => setActiveTab('desc')}>Description</button></li>
                                    <li><button className={`nav-link ${activeTab === 'feedback' ? 'active' : ''}`} onClick={() => setActiveTab('feedback')}>Feedback (2)</button></li>
                                </ul>
                                <div className="tab-content">
                                    {activeTab === 'desc' && (
                                        <div className="tab-pane fade show active" id="product-details-tab-desc">
                                            <div className="desc-content">
                                                <div className="row g-4">
                                                    <div className="col-lg-8">
                                                        <h3>About This Product</h3>
                                                        <p>{product.longDescription}</p>
                                                        <h4>Feature Highlights</h4>
                                                        <div className="row g-3">
                                                            <div className="col-sm-6">
                                                                <div className="highlight-card">
                                                                    <i className="bi bi-asterisk"></i>
                                                                    <div><h5>How to use:</h5><p>{product.usage}</p></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="highlight-card">
                                                                    <i className="bi bi-list"></i>
                                                                    <div><h5>Key Ingredients:</h5><p>{product.ingredients}</p></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}