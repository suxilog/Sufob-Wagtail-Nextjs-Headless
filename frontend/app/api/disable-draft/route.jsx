import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    draftMode().disable();
    const next = searchParams.get("next");
    return redirect(next || "/");
}
