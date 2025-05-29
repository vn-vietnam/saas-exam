import { NextResponse } from "next/server";
import { getPostsData } from "@/lib/serverUtils";

export function GET() {
    const posts = getPostsData();
    // console.log(posts);
    return NextResponse.json({
        code: 200,
        message: "ok",
        data: posts
    });
}