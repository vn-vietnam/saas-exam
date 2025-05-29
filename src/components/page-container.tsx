import React from "react";
function ContainerPage() {
	return (
		<div
			className="w-full h-[50vh] bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: "url('/main-images/bg.jpg')",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				backgroundBlendMode: "darken",
			}}
		>
			<div className="p-5 h-full flex flex-col justify-center items-center gap-4 ">
				<div className="text-4xl font-bold md:w-[60%] text-white text-center">
					Complete Test Prep Platform
				</div>
				<div className="md:w-[50%] text-white text-center">
					Academic & English Proficiency Exams
				</div>
			</div>
		</div>
	);
}

export default ContainerPage;
