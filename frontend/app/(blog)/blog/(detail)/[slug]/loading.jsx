import { PostDetailSkeleton } from "@ui/skeletons";
export default function Loading() {
    return (
        <div className="grow flex flex-col">
            <PostDetailSkeleton />
        </div>
    );
}
