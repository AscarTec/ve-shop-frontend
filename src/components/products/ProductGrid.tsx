import { ProductCard } from "./ProductCard";

const mockProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones with Active Noise Cancellation",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 1247,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    badge: "Best Seller",
    isOnSale: true
  },
  {
    id: "2", 
    name: "Smart Fitness Watch with Heart Rate Monitor",
    price: 199.99,
    rating: 4.8,
    reviewCount: 892,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    badge: "New"
  },
  {
    id: "3",
    name: "Professional Camera Lens 50mm f/1.8",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviewCount: 456,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
    isOnSale: true
  },
  {
    id: "4",
    name: "Ergonomic Office Chair with Lumbar Support",
    price: 349.99,
    rating: 4.6,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop"
  },
  {
    id: "5",
    name: "Premium Coffee Machine with Milk Frother",
    price: 449.99,
    originalPrice: 549.99,
    rating: 4.9,
    reviewCount: 1089,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    badge: "Editor's Choice",
    isOnSale: true
  },
  {
    id: "6",
    name: "Mechanical Gaming Keyboard RGB Backlit",
    price: 129.99,
    rating: 4.4,
    reviewCount: 678,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop"
  },
  {
    id: "7",
    name: "Wireless Phone Charger Stand Fast Charging",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.3,
    reviewCount: 145,
    image: "https://images.unsplash.com/photo-1609592669905-a3e7c959a401?w=400&h=400&fit=crop",
    isOnSale: true
  },
  {
    id: "8",
    name: "Smart Home Security Camera 1080p WiFi",
    price: 79.99,
    rating: 4.5,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    badge: "Trending"
  }
];

export const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
};