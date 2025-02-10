import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

const faqs = [
  {
    question: "What is the purpose of this game submission catalog?",
    answer:
      "Our catalog aims to showcase and promote games that prioritize accessibility features. We want to create a platform where developers can highlight their accessible games and where players can easily find games that cater to their specific needs.",
  },
  {
    question: "What types of accessibility features should my game include?",
    answer:
      "We encourage a wide range of accessibility features, including but not limited to: customizable controls, colorblind modes, subtitle options, text-to-speech functionality, difficulty adjustments, and support for assistive technologies. The more inclusive your game is, the better!",
  },
  {
    question: "How do I submit my game to the catalog?",
    answer:
      "To submit your game, use the submission form on our website. You'll need to provide basic information about your game, a detailed list of its accessibility features, and screenshots or videos demonstrating these features in action.",
  },
  {
    question: "Is there a cost to submit my game?",
    answer:
      "No, submitting your game to our catalog is completely free. Our goal is to promote accessibility in gaming, not to create financial barriers for developers.",
  },
  {
    question: "How long does the review process take?",
    answer:
      "Typically, we review submissions within 2-3 weeks. If we need additional information or clarification about your game's accessibility features, we'll contact you, which may extend the review period.",
  },
  {
    question: "Can I update my game's information after submission?",
    answer:
      "Yes, you can update your game's information at any time. We encourage developers to keep their listings current, especially when new accessibility features are added.",
  },
  {
    question: "Do you accept games from all platforms?",
    answer:
      "Yes, we accept games from all platforms including PC, consoles, mobile devices, and VR. Our catalog aims to be comprehensive and inclusive of all gaming platforms.",
  },
  {
    question: "How can players provide feedback on accessibility features?",
    answer:
      "Each game listing includes a feedback section where players can comment on their experience with the game's accessibility features. This helps other players and provides valuable feedback to developers.",
  },
  {
    question: "What if my game is still in development?",
    answer:
      "We welcome submissions for games in development. You can mark your submission as 'In Development' and update it as you add or refine accessibility features. This can be a great way to get early feedback from the community.",
  },
  {
    question: "How do you verify the accessibility features?",
    answer:
      "Our team reviews each submission and may test the game to verify the listed accessibility features. We also rely on community feedback to ensure the accuracy of the information provided.",
  },
];

export const Route = createFileRoute("/faqs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>
            Find answers to common questions about our accessible game
            submission catalog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Still have questions?</CardTitle>
          <CardDescription>
            If you couldn't find the answer you were looking for, please don't
            hesitate to reach out to us directly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a
            className={buttonVariants()}
            href="mailto:itsasmilemohammed@gmail.com"
          >
            Contact Support
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
