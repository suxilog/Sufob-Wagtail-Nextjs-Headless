// route handler enabling draft mode
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getDraftByToken } from "@lib/data";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get("content_type");
    const token = searchParams.get("token");
    if (!token) {
        return new Response("Invalid token", { status: 401 });
    }
    if (!contentType) {
        return new Response("contentType is required", { status: 401 });
    }

    const post = await getDraftByToken(contentType, token);

    if (!post) {
        return new Response("非法组合", { status: 401 });
    }

    draftMode().enable();
    console.log(`Draft mode enabled for ${post.meta.slug}`);
    return redirect(
        `/blog/${post.meta.slug}/?content_type=${contentType}&token=${token}`
    );
    // return new Response("Draft mode is enabled");
}
