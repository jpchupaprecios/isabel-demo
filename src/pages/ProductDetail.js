import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Minus, Plus, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { mockAPI } from '../services/mockAPI';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productData = await mockAPI.getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

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
      stars.push(<Star key={i} size={20} fill="#ffc107" color="#ffc107" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={20} fill="#ffc107" color="#ffc107" style={{opacity: 0.5}} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={20} color="#e9ecef" />);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={20} />
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="page-container">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <Link to={`/category/${product.category}`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          <div className="product-detail-container">
            <div className="product-image-section">
              <div className="main-image">
                <img src={product.image} alt={product.name} />
                {product.originalPrice && (
                  <div className="discount-badge">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
            </div>

            <div className="product-info-section">
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>

              <div className="product-pricing">
                <span className="current-price">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <div className="stock-status">
                {product.inStock ? (
                  <span className="in-stock">✅ En stock</span>
                ) : (
                  <span className="out-of-stock">❌ Sin stock</span>
                )}
              </div>

              <div className="quantity-selector">
                <label>Cantidad:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="product-actions">
                <button 
                  className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                  disabled={!product.inStock}
                >
                  <ShoppingCart size={20} />
                  {product.inStock ? 'Añadir al Carrito' : 'Sin Stock'}
                </button>
                <button className="favorite-btn">
                  <Heart size={20} />
                  Favoritos
                </button>
              </div>

              <div className="product-guarantees">
                <div className="guarantee">
                  <Truck size={24} />
                  <span>Envío gratis</span>
                </div>
                <div className="guarantee">
                  <Shield size={24} />
                  <span>Garantía 2 años</span>
                </div>
                <div className="guarantee">
                  <RotateCcw size={24} />
                  <span>Devolución 30 días</span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details-tabs">
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${selectedTab === 'description' ? 'active' : ''}`}
                onClick={() => setSelectedTab('description')}
              >
                Descripción
              </button>
              <button 
                className={`tab-btn ${selectedTab === 'features' ? 'active' : ''}`}
                onClick={() => setSelectedTab('features')}
              >
                Características
              </button>
            </div>

            <div className="tab-content">
              {selectedTab === 'description' && (
                <div className="description-content">
                  <p>{product.description}</p>
                </div>
              )}
              
              {selectedTab === 'features' && (
                <div className="features-content">
                  <ul>
                    {product.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;