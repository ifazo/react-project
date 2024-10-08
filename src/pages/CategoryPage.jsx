import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import CategoryProducts from '../components/CategoryProducts';

export default function CategoryPage() {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products?category=${slug}`);
                const data = await response.json();
                console.log(data);
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [slug]);

    if (loading) {
        return <Spinner />;
    }

  return (
    <div>
        <CategoryProducts products={products} />
    </div>
  )
}
