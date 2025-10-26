import React from 'react';
import ProductGrid from '../components/ProductGrid';
import CategorySection from '../components/CategorySection';
import './HomePage.css';

const HomePage = ({ products, categories }) => {
  const featuredProducts = products.slice(0, 6);
  const discountedProducts = products.filter(product => product.originalPrice);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Descubre los Mejores Productos</h1>
            <p>
              Miles de productos de las mejores marcas con envío gratis 
              y la mejor calidad garantizada
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Productos</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Marcas</span>
              </div>
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Clientes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container">
        <div className="container">
          <CategorySection categories={categories} />
          
          {discountedProducts.length > 0 && (
            <ProductGrid 
              products={discountedProducts} 
              title="🔥 Ofertas Especiales" 
            />
          )}
          
          <ProductGrid 
            products={featuredProducts} 
            title="📱 Productos Destacados" 
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;