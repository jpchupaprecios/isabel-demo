import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { mockAPI } from '../services/mockAPI';
import './CategoryPage.css';

const CategoryPage = ({ categories }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');

  const category = categories.find(cat => cat.id === categoryId);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const categoryProducts = await mockAPI.getProductsByCategory(categoryId);
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryProducts();
    }
  }, [categoryId]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos de {category?.name || 'la categoría'}...</p>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="page-container">
        <div className="container">
          <div className="category-header">
            <h1>{category?.name || 'Categoría'}</h1>
            <p>{products.length} productos encontrados</p>
          </div>

          <div className="category-controls">
            <div className="sort-controls">
              <label htmlFor="sort-select">Ordenar por:</label>
              <select 
                id="sort-select"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Nombre A-Z</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Valorados</option>
              </select>
            </div>
          </div>

          <ProductGrid products={sortedProducts} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;