import React from "react";
import {
	Card,
	CardContent,
	CardTitle,
	CardDescription,
	CardHeader,
} from "./ui/card";
import { Button } from "./ui/button";
const ListCard = () => {
	return (
		<div className="w-[100%] my-5 flex flex-col justify-center items-center gap-5">
			<div className="text-2xl font-bold">Our courses</div>
			<div className="w-[100%] flex flex-col md:flex-row justify-center items-center gap-5 ">
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>Create project</CardTitle>
						<CardDescription>
							Deploy your new project in one-click.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button>View more</Button>
					</CardContent>
				</Card>
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>Create project</CardTitle>
						<CardDescription>
							Deploy your new project in one-click.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button>View more</Button>
					</CardContent>
				</Card>
				<Card className="w-[300px] md:w-[350px]">
					<CardHeader>
						<CardTitle>Create project</CardTitle>
						<CardDescription>
							Deploy your new project in one-click.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button>View more</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ListCard;
