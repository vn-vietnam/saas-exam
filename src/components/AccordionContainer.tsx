import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionContainer() {
	return (
		<Accordion type="single" collapsible className="w-full md:w-[50%] mx-auto p-5">
			<div className="text-2xl font-bold my-5 text-center">Questions and answers</div>
			<AccordionItem value="item-1">
				<AccordionTrigger>Is it free?</AccordionTrigger>
				<AccordionContent>
					Yes. Absolutely free. No need to pay for anything.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Is it easy to use?</AccordionTrigger>
				<AccordionContent>
					Yes. I created this website for community. I will update it regularly.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>How to contact me?</AccordionTrigger>
				<AccordionContent>
					You can contact me via email kanni4952@gmail.com.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
