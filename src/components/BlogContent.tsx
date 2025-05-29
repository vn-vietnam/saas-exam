"use client";

import dayjs from "dayjs";
import React, { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
// import { pluginConfig } from "@/config/blog.config";
import { ArrowRight, StarIcon, TimerIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
// import Time from "./Time";
import Link from "next/link";
// import Pagination from "@/plugins/pagination";
// import { Separator } from "./ui/separator";

interface Post {
	id: string;
	title: string;
	date: string;
	summary?: string;
	draft?: boolean;
	pinned?: number;
	image?: string;
	tags: string[];
	stats: {
		minutes: number;
		text: string;
		time: string;
		words: number;
	};
}

function BlogContentInner({ posts }: { posts: Post[] }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Filter posts by current date and locale
	posts = posts.filter((post) => dayjs(post.date).isBefore(dayjs()));

	const currentTag = searchParams.get("tag");
	if (currentTag) {
		posts = posts.filter((post) => post.tags.includes(currentTag));
	}

	// const allPostCount = posts.length || 0;

	// const page: number = Number(searchParams.get("page")) || 1;
	// const { engine, pageSize } = pluginConfig.pagination;

	// if (engine) {
	// 	if (engine === "default") {
	// 		posts = posts.slice((page - 1) * pageSize, page * pageSize);
	// 	}
	// 	if (engine === "loadMore") {
	// 		posts = posts.slice(0, page * pageSize);
	// 	}
	// }

	// const generateHref = (page: number) => {
	// 	if (currentTag) {
	// 		return `blog?tag=${currentTag}&page=${page}`;
	// 	} else {
	// 		return `blog?page=${page}`;
	// 	}
	// };

	return (
		<>
			<h1 className="text-2xl font-bold my-5">
				{currentTag ? `Tag: ${currentTag}` : "Blogs"}
			</h1>
			<div className="flex flex-wrap gap-3 ">
				{posts.map((post, index) => (
					<Card
						className="relative h-full w-full md:w-[350px] md:h-[300px] flex flex-col justify-between hover:scale-102 transition-all duration-300 "
						style={{
							backgroundImage: `url(${post.image})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundColor: "rgba(0, 0, 0, 0.5)",
							backgroundBlendMode: "darken",
						}}
						key={index}
					>
						{post?.pinned && (
							<div className="absolute top-[-10px] right-[-10px] -rotate-15">
								<StarIcon size={40} className="text-yellow-200" fill="yellow" />
							</div>
						)}
						<CardHeader>
							<CardTitle className="text-white">{post.title}</CardTitle>
							<CardDescription className="text-white flex flex-col gap-5 mt-3 justify-between ">
								<div
									className={"text-base text-gray-300 flex items-center gap-2"}
								>
									<TimerIcon size={16} />
									{dayjs(post.date).format("MMMM D, YYYY")}
								</div>
								<div>{post?.stats?.text}</div>
								<div className={"gap-2 flex flex-wrap"}>
									{post.tags?.map((tag, index) => (
										<Link
											key={index}
											href={`${pathname}?tag=${tag}`}
											className="no-underline"
										>
											<div
												className={
													currentTag === tag
														? "text-sm border p-1 rounded-md font-bold text-white"
														: "text-sm border p-1 rounded-md text-gray-300"
												}
											>
												#{tag}
											</div>
										</Link>
									))}
								</div>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline" asChild>
								<Link href={`${pathname}/${post.id}`} className="no-underline">
									View more
									<ArrowRight size={16} className={"ml-2"} />
								</Link>
							</Button>
						</CardContent>
					</Card>
				))}
				{/* <Pagination allCount={allPostCount} generateHref={generateHref} /> */}
			</div>
		</>
	);
}

function BlogContent({ posts }: { posts: Post[] }) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<BlogContentInner posts={posts} />
		</Suspense>
	);
}

export default BlogContent;
