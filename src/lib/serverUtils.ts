import path from "path";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import dayjs from "dayjs";

interface Post {
	id: string;
	title: string;
	date: string;
	content: string;
	draft?: boolean;
	pinned?: number;
	tags: string[];
	stats: {
		words: number;
		text: string;
	};
	image?: string;
}

interface MatterData {
	title: string;
	date: string;
	draft?: boolean;
	pinned?: number;
	tags: string[];
	image?: string;
}

export const getPostsData = (): Post[] => {
	// Validate locale first

	const postsDirectory = path.join(process.cwd(), "src/posts");

	const fileNames = fs.readdirSync(postsDirectory);
	const posts = fileNames
		.map((fileName) => {
			const id = fileName.replace(/\.mdx?$/, "");
			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");
			const matterResult = matter(fileContents);
			const data = matterResult.data as MatterData;

			return {
				id,
				title: data.title,
				date: data.date,
				draft: data.draft,
				pinned: data.pinned,
				tags: data.tags || [],
				content: "\r\n" + `# ${data.title}` + matterResult.content,
				stats: readingTime(matterResult.content),
				image: data.image,
			} as Post;
		})
		.filter((post: Post) => !post.draft);

	const { pinnedPosts, commonPosts } = posts.reduce(
		(acc: { pinnedPosts: Post[]; commonPosts: Post[] }, post: Post) => {
			if (post.pinned) {
				acc.pinnedPosts.push(post);
			} else {
				acc.commonPosts.push(post);
			}
			return acc;
		},
		{ pinnedPosts: [], commonPosts: [] }
	);

	return [
		...pinnedPosts.sort((a: Post, b: Post) => {
			return (a.pinned || 0) - (b.pinned || 0);
		}),
		...commonPosts.sort((a: Post, b: Post) =>
			dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
		),
	];
};

export const getTagsData = (): Record<string, number> => {

	return getPostsData().reduce(
		(acc: Record<string, number>, post: Post) => {
			post.tags.forEach((tag: string) => {
				if (!acc[tag]) {
					acc[tag] = 0;
				}
				acc[tag]++;
			});
			return acc;
		},
		{}
	);
};
