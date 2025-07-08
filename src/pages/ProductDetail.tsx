import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useTranslation } from "react-i18next";

// Mock product data - in real app, this would come from API
const mockProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones with Active Noise Cancellation",
    brand: "AudioTech",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 1247,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop"
    ],
    description: "Experience premium sound quality with our advanced wireless headphones featuring industry-leading noise cancellation technology. Perfect for travel, work, or leisure.",
    specifications: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0, USB-C",
      "Weight": "250g",
      "Drivers": "40mm dynamic drivers",
      "Frequency Response": "20Hz - 20kHz",
      "Noise Cancellation": "Active ANC up to 35dB"
    },
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge - 10 minutes for 3 hours",
      "Multipoint connection",
      "Voice assistant support",
      "Foldable design"
    ],
    inStock: true,
    stockCount: 15,
    sku: "ATH-WH1000XM4",
    colors: ["Black", "Silver", "Blue"],
    sizes: [],
    badge: "Best Seller"
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['product', 'common']);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadProduct = async () => {
      setLoading(true);
      // In real app, fetch product by ID from API
      const foundProduct = mockProducts.find(p => p.id === id);
      
      if (!foundProduct) {
        navigate('/404');
        return;
      }
      
      setProduct(foundProduct);
      setLoading(false);
    };

    loadProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded"></div>
                <div className="h-6 bg-muted rounded w-2/3"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const breadcrumbItems = [
    { label: t('common:navigation.home'), href: '/' },
    { label: t('common:navigation.products'), href: '/products' },
    { label: product.name, href: `/product/${product.id}` }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-6">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ProductGallery images={product.images} productName={product.name} />
            <ProductInfo product={product} />
          </div>
          
          <ProductTabs product={product} />
          
          <RelatedProducts currentProductId={product.id} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;