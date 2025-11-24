import { Download, FileText, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import { useExamStatus } from '@/hooks/useExamStatus';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { examStatus, loading } = useExamStatus();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-64 w-full mb-8" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const phase = examStatus?.phase ?? 0;
  const phaseLabel = examStatus?.phaseLabel;
  const examDate = examStatus?.examDate ?? new Date().toISOString();
  const announcement = examStatus?.announcement ?? '';
  const questionPaperURL = examStatus?.questionPaperURL;
  const resultsURL = examStatus?.resultsURL;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <AnnouncementBanner announcement={announcement} className="sticky top-16 z-40" />

      <main className="flex-1">
        <Hero phase={phase} phaseLabel={phaseLabel} examDate={examDate} />

        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Question Paper Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Question Paper</CardTitle>
                  </div>
                  <CardDescription>
                    Download the exam question paper and syllabus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {questionPaperURL ? (
                    <Button asChild className="w-full min-h-[44px]">
                      <a href={questionPaperURL} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-5 w-5" />
                        Download Question Paper
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="w-full min-h-[44px]">
                      <FileText className="mr-2 h-5 w-5" />
                      Not Available Yet
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Results Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Award className="h-6 w-6 text-success" />
                    </div>
                    <CardTitle>Results</CardTitle>
                  </div>
                  <CardDescription>
                    View exam results and scholarship announcements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {resultsURL ? (
                    <Button asChild variant="default" className="w-full min-h-[44px] bg-success hover:bg-success/90">
                      <a href={resultsURL} target="_blank" rel="noopener noreferrer">
                        <Award className="mr-2 h-5 w-5" />
                        View Results
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="w-full min-h-[44px]">
                      <Award className="mr-2 h-5 w-5" />
                      Results Not Published
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Important Information */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Ensure you have a stable internet connection during the exam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Download and review the question paper before the exam date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Results will be published on this page after evaluation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>For any queries, please visit our Contact page</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
