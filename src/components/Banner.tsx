import Link from "next/link";
import { Button } from "./ui/button";

const Banner = () => {
	return (
		<div
			className="w-[100%] h-[400px]  flex flex-col justify-center items-center gap-3 text-white"
			style={{
				backgroundImage: "url('/main-images/bg-banner-1.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				backgroundBlendMode: "darken",
			}}
		>
			<div className="text-xl md:text-4xl font-bold text-center">
				Master University Entrance | VSTEP | TOEIC Proficiency
			</div>
			<div className="text-sm md:text-2xl">
				Tip for Exam, Updated Exercises, Free Materials
			</div>
			<div className="flex flex-col md:flex-row gap-4">
				<Button variant="secondary">
					<Link href="/tips">View More</Link>
				</Button>
			</div>
		</div>
	);
};

export default Banner;
