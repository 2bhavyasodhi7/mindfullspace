
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs: FAQItem[] = [
    {
      question: "What is mindfulness?",
      answer: "Mindfulness is the practice of being fully present and aware of your thoughts, emotions, and surroundings without judgment."
    },
    {
      question: "How is mindfulness different from meditation?",
      answer: "Meditation is a structured practice, while mindfulness can be practiced anytime in daily life by staying aware and present in the moment."
    },
    {
      question: "What are the benefits of mindfulness?",
      answer: "Mindfulness can reduce stress, improve focus, enhance emotional regulation, boost creativity, and promote overall well-being."
    },
    {
      question: "How do I start practicing mindfulness?",
      answer: "Begin with simple exercises like mindful breathing, body scans, or focusing on your senses while doing daily activities."
    },
    {
      question: "How long should I practice mindfulness each day?",
      answer: "Even 5–10 minutes a day can be beneficial, but longer practices (20–30 minutes) can deepen the effects."
    },
    {
      question: "Can mindfulness help with anxiety and depression?",
      answer: "Yes, mindfulness can help manage anxiety and depression by reducing overthinking and promoting emotional balance."
    },
    {
      question: "Is mindfulness a religious practice?",
      answer: "While mindfulness has roots in Buddhism, it is a secular practice that anyone can use, regardless of religious beliefs."
    },
    {
      question: "Can I practice mindfulness while working or studying?",
      answer: "Yes, you can be mindful by focusing on one task at a time, taking deep breaths, and reducing distractions."
    },
    {
      question: "What are some common obstacles in mindfulness practice?",
      answer: "Common challenges include a wandering mind, impatience, expecting immediate results, and difficulty staying consistent."
    },
    {
      question: "How do I know if mindfulness is working for me?",
      answer: "You may notice increased self-awareness, reduced stress, better concentration, and improved emotional responses over time."
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="text-center mindful-heading">
          Frequently Asked <span className="text-mindful">Questions</span>
        </h2>
        
        <div className="max-w-3xl mx-auto mt-12">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-mindful" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
