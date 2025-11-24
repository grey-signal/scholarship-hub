import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FAQ = () => {
  const faqs = [
    {
      question: 'Who is eligible to apply for the scholarship exam?',
      answer: 'Students from all backgrounds who meet the basic academic criteria are eligible. Specific eligibility requirements include being enrolled in an accredited educational institution and meeting minimum GPA requirements.',
    },
    {
      question: 'How do I register for the exam?',
      answer: 'Registration details will be posted on the home page when the registration phase begins. You will need to fill out an online form and submit required documents.',
    },
    {
      question: 'What is the exam format?',
      answer: 'The exam consists of multiple-choice questions covering mathematics, sciences, and general knowledge. The question paper will be available for download before the exam date.',
    },
    {
      question: 'When will the results be announced?',
      answer: 'Results are typically announced 2-3 weeks after the exam date. They will be posted on this website and notifications will be sent to all participants.',
    },
    {
      question: 'What does the scholarship cover?',
      answer: 'Scholarships cover tuition fees, books, and educational materials. The exact coverage depends on the scholarship tier awarded based on exam performance.',
    },
    {
      question: 'Can I retake the exam if I don\'t pass?',
      answer: 'Yes, students can retake the exam in the next cycle. We conduct the scholarship exam twice a year.',
    },
    {
      question: 'How do I prepare for the exam?',
      answer: 'Download the question paper and syllabus from the home page. We also provide study materials and past papers to help you prepare effectively.',
    },
    {
      question: 'What documents do I need to bring on exam day?',
      answer: 'You need to bring a valid ID, your registration confirmation, and writing materials. Specific requirements will be detailed in your registration confirmation email.',
    },
    {
      question: 'Is there an exam fee?',
      answer: 'No, the examination is completely free of charge. Our goal is to make educational opportunities accessible to everyone.',
    },
    {
      question: 'How can I contact the organization for more questions?',
      answer: 'Visit our Contact page for phone numbers, email addresses, and office locations. Our support team is available Monday through Friday, 9 AM to 5 PM.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions about the scholarship exam and application process.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-lg border border-border px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-semibold text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
