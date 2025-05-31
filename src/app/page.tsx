import { AccordionContainer } from "@/components/AccordionContainer";
import Banner from "@/components/Banner";
import CarouselCard from "@/components/CarouselCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ListCard from "@/components/ListCard";
import ContainerPage from "@/components/page-container";
import GlobeComponent from "@/components/GlobeComponent";
import { MarqueeComponent } from "@/components/MarqueeComponent";
export default function Home() {
	return (
		<div className="">
			<Header />
			<ContainerPage />
			<ListCard />
			<Banner />
			<CarouselCard />
			<AccordionContainer />
			<MarqueeComponent />
			<GlobeComponent />
			<Footer />
		</div>
	);
}
