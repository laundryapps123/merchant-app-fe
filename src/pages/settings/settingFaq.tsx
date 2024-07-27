import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../../context/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

interface IFaq {
  question: string;
  answer: string;
  value: string;
}

const SettingFaq = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);

  const faqList: IFaq[] = [
    {
      question: "Pertanyaan 1",
      answer: "Jawaban pertanyaan 1",
      value: "q-1",
    },
    {
      question: "Pertanyaan 2",
      answer: "Jawaban pertanyaan 2",
      value: "q-2",
    },
    {
      question: "Pertanyaan 3",
      answer: "Jawaban pertanyaan 3",
      value: "q-3",
    },
  ];

  useEffect(() => {
    setShowTitle(true);
    setTitle("FAQ");
    setShowBackIcon(true);
    setPrevPath("settings");
  }, []);

  return (
    <div className="mx-4">
      <Accordion type="single" collapsible className="w-full">
        {faqList.map((faq: IFaq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger className="font-bold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SettingFaq;
