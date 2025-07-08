import { Star, User, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

interface ProductTabsProps {
  product: {
    description: string;
    specifications?: Record<string, string>;
    features?: string[];
  };
}

export const ProductTabs = ({ product }: ProductTabsProps) => {
  const { t } = useTranslation('product');
  const { user } = useAuth();

  const mockReviews = [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent quality!",
      content: "These headphones exceed expectations. Sound quality is amazing and noise cancellation works perfectly."
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      date: "2024-01-10",
      title: "Great value for money",
      content: "Very satisfied with the purchase. Comfortable to wear for long periods."
    }
  ];

  return (
    <div className="mt-12">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">{t('tabs.description', 'Description')}</TabsTrigger>
          <TabsTrigger value="specifications">{t('tabs.specifications', 'Specifications')}</TabsTrigger>
          <TabsTrigger value="reviews">{t('tabs.reviews', 'Reviews')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              
              {product.features && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">{t('labels.key_features', 'Key Features')}</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              {product.specifications ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No specifications available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t('reviews.customer_reviews', 'Customer Reviews')}</h3>
              {user ? (
                <Button>{t('reviews.write_review', 'Write a Review')}</Button>
              ) : (
                <Button variant="outline">{t('reviews.login_to_review', 'Login to Review')}</Button>
              )}
            </div>
            
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">{review.user}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    
                    <h4 className="font-medium mb-2">{review.title}</h4>
                    <p className="text-muted-foreground">{review.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};