import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Shirt, Home, Dumbbell, Book } from 'lucide-react';
import './CategorySection.css';

const CategorySection = ({ categories }) => {
  const getCategoryIcon = (categoryId) => {
    const iconMap = {
      'electronica': <Smartphone size={32} />,
      'ropa': <Shirt size={32} />,
      'hogar': <Home size={32} />,
      'deportes': <Dumbbell size={32} />,
      'libros': <Book size={32} />
    };
    return iconMap[categoryId] || <Home size={32} />;
  };

  return (
    <section className="category-section">
      <h2 className="section-title">Explorar Categorías</h2>
      <div className="category-grid">
        {categories.map(category => (
          <Link 
            key={category.id} 
            to={`/category/${category.id}`} 
            className="category-card"
          >
            <div className="category-icon">
              {getCategoryIcon(category.id)}
            </div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <span className="product-count">{category.count} productos</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;