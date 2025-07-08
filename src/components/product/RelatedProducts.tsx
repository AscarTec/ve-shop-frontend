import { ProductCard } from "@/components/products/ProductCard";
import { useTranslation } from "react-i18next";

interface RelatedProductsProps {
  currentProductId: string;
}

export const RelatedProducts = ({ currentProductId }: RelatedProductsProps) => {
  const { t } = useTranslation('product');

  const relatedProducts = [
    {
      id: "2",
      name: "Wireless Mouse Pro",
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.3,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      badge: "Popular"
    },
    {
      id: "3", 
      name: "Mechanical Keyboard RGB",
      price: 129.99,
      rating: 4.7,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      badge: "New"
    },
    {
      id: "4",
      name: "USB-C Hub 7-in-1",
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.4,
      reviewCount: 234,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
    }
  ].filter(product => product.id !== currentProductId);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">
        {t('related.title', 'Related Products')}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};