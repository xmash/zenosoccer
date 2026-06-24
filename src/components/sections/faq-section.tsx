import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeading } from './section-heading';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  items: readonly FaqItem[];
  eyebrow?: string;
  title: string;
  description?: string;
};

export function FaqSection({ items, eyebrow, title, description }: FaqSectionProps) {
  return (
    <section className="section bg-muted/20">
      <div className="section-inner max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <Accordion type="single" collapsible className="mt-10 w-full">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
