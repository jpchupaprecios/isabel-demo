import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import { mockAPI } from './services/mockAPI';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          mockAPI.getProducts(),
          mockAPI.getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header categories={categories} />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={<HomePage products={products} categories={categories} />} 
            />
            <Route 
              path="/product/:id" 
              element={<ProductDetail products={products} />} 
            />
            <Route 
              path="/category/:categoryId" 
              element={<CategoryPage products={products} categories={categories} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;