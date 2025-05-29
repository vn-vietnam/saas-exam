import BlogContent from "@/components/BlogContent";
import { getPostsData } from "@/lib/serverUtils";

export default async function BlogPage() {
	const posts = await getPostsData();
	return (
		<div className="p-5 min-h-[100vh]">
			<BlogContent posts={posts} />
		</div>
	);
}
