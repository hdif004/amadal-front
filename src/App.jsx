import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import './i18n';
import { LanguageProvider } from './contexts/LanguageContext';

const Home          = lazy(() => import("./pages/Home"));
const About         = lazy(() => import("./pages/About"));
const Products      = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const BlogHub       = lazy(() => import("./pages/BlogHub"));
const BlogPostPage  = lazy(() => import("./pages/BlogPostPage"));
const ContactPage   = lazy(() => import("./pages/ContactPage"));
const ContactSuccess = lazy(() => import("./pages/ContactSuccess"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const PostsPage     = lazy(() => import("./pages/PostsPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <div className="no-scrollbar">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/"                              element={<Home />} />
            <Route path="/about"                         element={<About />} />
            <Route path="/products"                      element={<Products />} />
            <Route path="/products/:slug/:productid"     element={<ProductDetail />} />
            <Route path="/blog"                          element={<BlogHub />} />
            <Route path="/blog/:blogtitle/:blogid"       element={<BlogPostPage />} />
            <Route path="/contact"                       element={<ContactPage />} />
            <Route path="/contact/success"               element={<ContactSuccess />} />
            <Route path="/s"                             element={<SearchResults />} />
            <Route path="/posts"                         element={<PostsPage />} />
            <Route path="/privacy-policy"                element={<PrivacyPolicy />} />
          </Routes>
        </Suspense>
      </div>
    </LanguageProvider>
  );
}

export default App;
