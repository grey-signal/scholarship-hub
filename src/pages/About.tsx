import { Target, Heart, Users, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide equal educational opportunities to deserving students through merit-based scholarships.',
    },
    {
      icon: Heart,
      title: 'Our Vision',
      description: 'Creating a society where financial constraints never limit access to quality education.',
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Building a supportive network of students, educators, and volunteers committed to learning.',
    },
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      description: 'Promoting higher standards of education and recognizing outstanding academic achievement.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
              About Our Organization
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
              Dedicated to empowering the next generation through accessible education and scholarship opportunities.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Who We Are</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We are a dedicated non-profit organization committed to breaking down financial barriers in education. 
                  For over a decade, we have been supporting bright and motivated students from diverse backgrounds 
                  achieve their academic dreams through our comprehensive scholarship program.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our scholarship examination is designed to identify talented individuals who demonstrate both 
                  academic excellence and a genuine passion for learning. We believe that merit and determination, 
                  not financial circumstances, should determine access to quality education.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {values.map((value) => (
                <Card key={value.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Our Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Scholarships Awarded</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">10+</div>
                    <div className="text-sm text-muted-foreground">Years of Service</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Partner Institutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
