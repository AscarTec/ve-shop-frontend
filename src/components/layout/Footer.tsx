import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Ve-Shop
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted online marketplace for quality products at unbeatable prices.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">📘</Button>
              <Button variant="outline" size="icon">🐦</Button>
              <Button variant="outline" size="icon">📷</Button>
              <Button variant="outline" size="icon">💼</Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Button variant="link" className="p-0 text-muted-foreground hover:text-foreground">About Us</Button></li>
              <li><Button variant="link" className="p-0 text-muted-foreground hover:text-foreground">Contact</Button></li>
              <li><Button variant="link" className="p-0 text-muted-foreground hover:text-foreground">Careers</Button></li>
              <li><Button variant="link" className="p-0 text-muted-foreground hover:text-foreground">Press</Button></li>
              <li><Button variant="link" className="p-0 text-muted-foreground hover:text-foreground">Blog</Button></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Button variant="link" className="p-0 text-muted-foreground hover:text-foreground">Help Center</Button></li>
              <li><Button variant="link" className="p-0 text-muted-foreground hover:text-foreground">Returns</Button></li>
              <li><Button variant="link" className="p-0 text-muted-foreground hover:text-foreground">Shipping Info</Button></li>
              <li><Button variant="link" className="p-0 text-muted-foreground hover:text-foreground">Track Order</Button></li>
              <li><Button variant="link" className="p-0 text-muted-foreground hover:text-foreground">Size Guide</Button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Ve-Shop. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="link" className="p-0 text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Button>
            <Button variant="link" className="p-0 text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Button>
            <Button variant="link" className="p-0 text-xs text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};