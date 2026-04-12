import { searchProducts } from '../api/api';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await searchProducts(query);
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
      setLoading(false);
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return <div className="mt-20 px-4 md:px-8 lg:px-12 py-4">Loading...</div>;
  }

  return (
    <div className="mt-20 px-4 md:px-8 lg:px-12 py-4">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
        Search Results for "{query}"
      </h2>
      
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-48 object-contain mb-2"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 