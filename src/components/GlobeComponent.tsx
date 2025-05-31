import { Globe } from "@/components/magicui/globe";
import Image from "next/image";
// import { Meteors } from "./magicui/meteors";

function GlobeComponent() {
	return (
		<div className="flex flex-col items-center justify-center relative overflow-hidden">
			{/* <Meteors /> */}
			<Image src="/logo/logo-circle.png" alt="Logo" width={100} height={100} />
			<div className="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-lg px-40 pb-40 pt-8 md:pb-60">
				<Globe className="" />
			</div>
		</div>
	);
}

export default GlobeComponent;
