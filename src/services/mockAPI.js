const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1199.99,
    originalPrice: 1299.99,
    category: "electronica",
    image: "https://images.unsplash.com/photo-1592286193157-e2e65f4c63a7?w=400",
    description: "El último iPhone con chip A17 Pro, cámara de 48MP y titanio.",
    features: ["Chip A17 Pro", "Cámara 48MP", "Diseño en titanio", "USB-C"],
    inStock: true,
    rating: 4.8,
    reviews: 2847
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 999.99,
    category: "electronica",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400",
    description: "Smartphone Samsung con IA integrada y cámara de 200MP.",
    features: ["Cámara 200MP", "IA Galaxy", "Snapdragon 8 Gen 3", "5G"],
    inStock: true,
    rating: 4.6,
    reviews: 1923
  },
  {
    id: 3,
    name: "Nike Air Max 90",
    price: 129.99,
    originalPrice: 149.99,
    category: "ropa",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    description: "Zapatillas deportivas clásicas con amortiguación Air Max.",
    features: ["Amortiguación Air Max", "Diseño clásico", "Materiales premium"],
    inStock: true,
    rating: 4.7,
    reviews: 5621
  },
  {
    id: 4,
    name: "MacBook Pro M3",
    price: 1999.99,
    category: "electronica",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    description: "Portátil profesional con chip M3 y pantalla Liquid Retina XDR.",
    features: ["Chip M3", "Pantalla 14\"", "16GB RAM", "512GB SSD"],
    inStock: false,
    rating: 4.9,
    reviews: 892
  },
  {
    id: 5,
    name: "Sofá Moderno 3 Plazas",
    price: 899.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    description: "Sofá cómodo y elegante para sala de estar moderna.",
    features: ["Tapizado premium", "Estructura resistente", "Cojines extraíbles"],
    inStock: true,
    rating: 4.4,
    reviews: 234
  },
  {
    id: 6,
    name: "Cafetera Espresso Deluxe",
    price: 299.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?w=400",
    description: "Cafetera profesional para preparar el mejor espresso en casa.",
    features: ["15 bares de presión", "Molinillo integrado", "Vaporizador"],
    inStock: true,
    rating: 4.5,
    reviews: 1456
  }
];

const mockCategories = [
  { id: "electronica", name: "Electrónica", count: 156 },
  { id: "ropa", name: "Ropa y Accesorios", count: 234 },
  { id: "hogar", name: "Hogar y Jardín", count: 89 },
  { id: "deportes", name: "Deportes", count: 167 },
  { id: "libros", name: "Libros", count: 78 }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAPI = {
  async getProducts() {
    await delay(800);
    return mockProducts;
  },

  async getProductById(id) {
    await delay(600);
    return mockProducts.find(product => product.id === parseInt(id));
  },

  async getProductsByCategory(categoryId) {
    await delay(700);
    return mockProducts.filter(product => product.category === categoryId);
  },

  async getCategories() {
    await delay(500);
    return mockCategories;
  },

  async searchProducts(query) {
    await delay(600);
    return mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }
};