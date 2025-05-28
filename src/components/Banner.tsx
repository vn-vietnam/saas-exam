import { Button } from "./ui/button";

const Banner = () => {
	return (
		<div className="w-[100%] h-[300px] bg-gray-300 flex flex-col justify-center items-center gap-3">
			<div className="text-xl md:text-4xl font-bold">Conquer vstep b1, b2 easily</div>
			<div className="text-sm md:text-2xl">Tip for Exam, Updated Exercises, Free Materials</div>
			<div className="flex flex-col md:flex-row gap-4">
				<Button>Receive free materials</Button>
				<Button>Get Started</Button>
			</div>
		</div>
	);
};

export default Banner;

