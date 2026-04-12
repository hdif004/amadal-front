import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import './i18n';
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import BlogHub from "./pages/BlogHub";
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from "./pages/ContactPage";
import ContactSuccess from "./pages/ContactSuccess"
import { LanguageProvider } from './contexts/LanguageContext';
import SearchResults from './pages/SearchResults';
import PostsPage from './pages/PostsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Analytics removed
  }, [location]);

  return (
    <LanguageProvider>
      <div className="no-scrollbar">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug/:productid" element={<ProductDetail />} />
          <Route path="/blog" element={<BlogHub />} />
          <Route path="/blog/:blogtitle/:blogid" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact/success" element={<ContactSuccess />} />
          <Route path="/s" element={<SearchResults />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;