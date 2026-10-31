'use client';
import Link from 'next/link';
import { Item } from "../../models/item";
import {useCart} from "../context/cartContext";
import {useState} from "react";
import {getAllItems} from "../../services/itemsSrcv";

const products: Item[] = await getAllItems();

export default function CategoryPage() {
    const { addToCart } = useCart();
    const [addedId, setAddedId] = useState<number | string | null>(null);

    const handleAddToCart = (product: any, finalPrice: number) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: finalPrice,
            img: product.images[0]
        });

        // Déclenche l'animation pour ce produit précis
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1000);
    };
    return (
        <main className="main">
            {/* Page Title */}
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">All Products</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li><Link href="/">Home</Link></li>
                            <li className="current">All Products</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section id="category-product-list" className="category-product-list section">
                <div className="container">
                    <div className="row g-3 g-lg-4">
                        {products.map((product) => {
                            const finalPrice = product.price - (product.price * ((product.discountPercent || 0) / 100));

                            return (
                                <div key={product.id} className="col-md-6 col-lg-4">
                                    <article className="product-tile">
                                        <div className="tile-visual">
                                            <Link href={`/product/${product.id}`}>
                                                <img src={product.images[0]} className="img-fluid" alt={product.name} loading="lazy" />
                                            </Link>
                                            {product.discountPercent && (
                                                <span className="status-tag tag-discount">-{product.discountPercent}%</span>
                                            )}
                                        </div>
                                        <div className="tile-body">
                                            <span className="tile-badge">Bana Rituals</span>
                                            <h4 className="tile-title">
                                                <Link href={`/product/${product.id}`}>{product.name}</Link>
                                                <Link href={`/product/${product.id}`} className="btn btn-sm btn-outline-secondary ms-5">
                                                    Details
                                                </Link>
                                            </h4>
                                        </div>
                                        <div className="tile-footer">
                                            <span className="tile-price">
                                                {finalPrice.toFixed(2)}€
                                                {product.discountPercent && (
                                                    <del className="original-price ms-2">{product.price.toFixed(2)}€</del>
                                                )}
                                            </span>
                                            <button
                                                type="button"
                                                className="add-cart-btn"
                                                onClick={() => handleAddToCart(product, finalPrice)}
                                            >
                                                {addedId === product.id ? "Added! ✓" : "Add to Cart"}
                                            </button>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}