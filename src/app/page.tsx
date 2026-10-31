export default function Home() {
    return (
        <main className="main">
            {/* Hero Section */}
            <section id="hero" className="hero section light-background">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-5">
                            <div className="intro-content">
                                <h1 className="headline">Bana Rituals</h1>
                                <p className="subtext">
                                    Bana Rituals is a natural hair care brand dedicated to the health and beauty of hair.
                                    Each product is formulated using plant oils, butters and botanical extracts
                                    such as shea, moringa, rosemary and aloe vera.
                                    The range aims to moisturise, strengthen and stimulate growth whilst celebrating traditional hair care rituals.
                                </p>
                                <div className="action-group">
                                    <a href="/category" className="btn-ghost-action">
                                        <i className="bi bi-arrow-right me-2"></i>See All Products
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <div className="product-tile" style={{ padding: 0, border: 'none' }}>
                                        <div className="tile-image" style={{ width: '100%', height: 'auto' }}>
                                            <a href="/range-details">
                                                <img
                                                    src="/assets/img/product/all_floral.png"
                                                    className="img-fluid"
                                                    alt="Product"
                                                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                                />
                                            </a>
                                        </div>
                                        <div className="tile-info">
                                            <h4>Bana Rituals products range</h4>
                                            <div className="tile-price">
                                                <span className="current">43.99€</span>
                                                <span className="original">50.99€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promo Cards Section */}
            <section id="promo-cards" className="promo-cards section">
                <div className="container">
                    <div className="row g-4 align-items-stretch mb-5">
                        <div className="col-lg-7">
                            <div className="highlight-card">
                                <img src="/assets/img/black.svg" alt="Winter Lookbook" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-5 d-flex">
                            <div className="highlight-info">
                                <h2>Bana Rituals Hair Care Guide – Coming Soon</h2>
                                <p>
                                    A complete and practical book dedicated to understanding, maintaining, and growing healthy Afro hair.
                                    Packed with expert tips, natural routines, and proven techniques to help you care for your curls, coils,
                                    and kinks with confidence.
                                </p>
                                <ul className="feature-list">
                                    <li><i className="bi bi-check-circle"></i> Essential daily and weekly routines</li>
                                    <li><i className="bi bi-check-circle"></i> Growth tips, moisture strategies & protective care</li>
                                    <li><i className="bi bi-check-circle"></i> Natural ingredients and product recommendations</li>
                                </ul>
                                <div className="btn-primary-action">Coming Soon</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}