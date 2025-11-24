import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
              Have questions? We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Email</CardTitle>
                </div>
                <CardDescription>Send us an email anytime</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:info@scholarshipngo.org"
                  className="text-primary hover:underline font-medium"
                >
                  info@scholarshipngo.org
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  We typically respond within 24-48 hours
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Phone</CardTitle>
                </div>
                <CardDescription>Call us during business hours</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:+1234567890"
                  className="text-primary hover:underline font-medium"
                >
                  +1 (234) 567-890
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Monday - Friday, 9:00 AM - 5:00 PM
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Office Address</CardTitle>
                </div>
                <CardDescription>Visit us in person</CardDescription>
              </CardHeader>
              <CardContent>
                <address className="not-italic text-muted-foreground">
                  123 Education Street<br />
                  Learning City, LC 12345<br />
                  United States
                </address>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Office Hours</CardTitle>
                </div>
                <CardDescription>When you can reach us</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-4xl mx-auto mt-8">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                For general inquiries, please email us at info@scholarshipngo.org or call during business hours.
                For urgent matters related to active exams, please call our hotline.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Our dedicated support team is committed to helping you with any questions about the scholarship
                  program, exam procedures, or application process. We strive to respond to all inquiries promptly
                  and provide the information you need to succeed.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
