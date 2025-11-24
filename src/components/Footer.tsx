import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">About NGO</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Dedicated to empowering students through educational opportunities and scholarships.
              Supporting bright minds to achieve their academic goals.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@scholarshipngo.org" className="hover:text-primary transition-colors">
                  info@scholarshipngo.org
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Education St, Learning City</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Scholarship NGO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
