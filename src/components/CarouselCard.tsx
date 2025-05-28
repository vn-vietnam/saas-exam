import * as React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function CarouselCard() {
	return (
		<div className="flex flex-col gap-3 items-center">
			<div className="text-2xl font-bold mt-5">Our courses</div>
			<Carousel
				opts={{
					align: "start",
					loop: true,
				}}
				className="w-[80%] p-3 mx-auto"
			>
				<CarouselContent>
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem
							key={index}
							className="md:basis-1/2 lg:basis-1/3 disabled:opacity-0 "
						>
							<div className="p-1">
								<Card className="">
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
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="hidden sm:block" />
				<CarouselNext className="hidden sm:block" />
			</Carousel>
			<Separator />
		</div>
	);
}
