import React from "react";
import { AuroraText } from "./magicui/aurora-text";
import { RetroGrid } from "./magicui/retro-grid";
function ContainerPage() {
	return (
		<div
			className="w-full h-[50vh] bg-cover bg-center bg-no-repeat relative"
		>
			<RetroGrid />
			<div className="p-5 h-full flex flex-col justify-center items-center gap-4 ">
				<div className="sm:text-5xl text-3xl font-bold md:w-[60%] text-white text-center">
					<AuroraText>Complete Test Prep Platform</AuroraText>
				</div>
				<div className="md:w-[50%] text-gray-500 text-center">
					Academic & English Proficiency Exams
				</div>
			</div>
		</div>
	);
}

export default ContainerPage;
