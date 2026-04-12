import React, { useEffect, useState } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Politique de confidentialité");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/wp-json/wp/v2/pages?slug=privacy-policy")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.length > 0) {
          setTitle(data[0].title.rendered);
          setContent(data[0].content.rendered);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Politique de confidentialité | Amadal Global Systems</title>
        <meta name="description" content="Politique de confidentialité d'Amadal Global Systems." />
        <link rel="canonical" href="https://amadal.ma/privacy-policy" />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-[#f7faf9] pt-16">

        {/* Hero */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-12 lg:py-16">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/50" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">Légal</span>
              </div>
              {loading ? (
                <div className="h-10 w-72 bg-gray-200 rounded-lg animate-pulse" />
              ) : (
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
              <p className="text-gray-500 text-sm">Dernière mise à jour : avril 2025</p>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 lg:px-16 py-12 lg:py-16">
          {loading ? (
            <div className="flex flex-col gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${80 + (i % 3) * 10}%` }} />
              ))}
            </div>
          ) : error ? (
            <p className="text-gray-500 text-sm">Contenu non disponible.</p>
          ) : (
            <><style>{`
              .wp-content h1, .wp-content h2, .wp-content h3, .wp-content h4 {
                font-weight: 700;
                color: #111827;
                margin-top: 2rem;
                margin-bottom: 0.75rem;
                line-height: 1.3;
              }
              .wp-content h1 { font-size: 1.75rem; }
              .wp-content h2 { font-size: 1.25rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; }
              .wp-content h3 { font-size: 1.05rem; }
              .wp-content p {
                font-size: 0.9rem;
                color: #4b5563;
                line-height: 1.8;
                margin-bottom: 1rem;
              }
              .wp-content ul, .wp-content ol {
                padding-left: 1.5rem;
                margin-bottom: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.35rem;
              }
              .wp-content ul { list-style-type: disc; }
              .wp-content ol { list-style-type: decimal; }
              .wp-content li {
                font-size: 0.9rem;
                color: #4b5563;
                line-height: 1.7;
              }
              .wp-content a {
                color: #048162;
                text-decoration: none;
              }
              .wp-content a:hover { text-decoration: underline; }
              .wp-content strong { color: #1f2937; font-weight: 600; }
              .wp-content hr {
                border: none;
                border-top: 1px solid #e5e7eb;
                margin: 2rem 0;
              }
              .wp-content blockquote {
                border-left: 3px solid #048162;
                padding-left: 1rem;
                margin: 1.5rem 0;
                color: #6b7280;
                font-style: italic;
              }
            `}</style>
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: content }}
            /></>

          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
