import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, title }) => {
  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <p>No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="product-grid-section">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;