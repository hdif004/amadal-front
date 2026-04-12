import { fetchCategories, fetchBrands } from "../api/api";

const ProductModal = ({ product, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [activeTab, setActiveTab] = useState('en');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          fetchCategories(),
          fetchBrands()
        ]);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching categories or brands:", error);
      }
    };
    fetchData();
  }, []);

  // Find category and brand names based on IDs
  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.idcategory === id);
    return category ? category.name : "N/A";
  };

  const getBrandName = (id) => {
    const brand = brands.find((brand) => brand.idbrand === parseInt(id));
    return brand ? brand.name : "N/A";
  };

  if (!product) return null; // Return null if no product is provided

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg drop-shadow-2xl max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mb-4 border-b">
          <button
            className={`px-4 py-2 ${activeTab === 'en' ? 'border-b-2 border-primary text-primary' : ''}`}
            onClick={() => setActiveTab('en')}
          >
            English
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'fr' ? 'border-b-2 border-primary text-primary' : ''}`}
            onClick={() => setActiveTab('fr')}
          >
            French
          </button>
        </div>
        <div className="flex gap-4">
          <img
            src={product.imageURL}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-2">
              {activeTab === 'en' ? product.name_en || product.name : product.name_fr}
            </h2>
            <div
              className="text-sm font-light product-description text-black"
              dangerouslySetInnerHTML={{ 
                __html: activeTab === 'en' 
                  ? product.description_en || product.description 
                  : product.description_fr 
              }}
            />
            <p className="text-sm text-black mt-2">
              <span className="text-primary">Category:</span>{" "}
              {getCategoryName(product.idcategory)}
            </p>
            <p className="text-sm text-black">
              <span className="text-primary">Brand:</span>{" "}
              {getBrandName(parseInt(product.idbrand))}
            </p>
            {product.pdfUrl && (
              <p className="text-sm text-black">
                <span className="text-primary">PDF:</span>{" "}
                <a href={product.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View PDF
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
