import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="#ffc107" color="#ffc107" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} fill="#ffc107" color="#ffc107" style={{opacity: 0.5}} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="#e9ecef" />);
    }

    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="product-image" />
        </Link>
        {product.originalPrice && (
          <div className="discount-badge">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </div>
        )}
        {!product.inStock && (
          <div className="stock-badge">Sin Stock</div>
        )}
        <button className="favorite-btn">
          <Heart size={20} />
        </button>
      </div>

      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-name">
          <h3>{product.name}</h3>
        </Link>
        
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <button 
          className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
          disabled={!product.inStock}
        >
          <ShoppingCart size={18} />
          {product.inStock ? 'Añadir al Carrito' : 'Sin Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;