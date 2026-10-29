// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import CarPost from "@/components/car/Post";
import PostsLoadingSkeleton from "@/components/car/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { CarPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ParvekirinaYek() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "isler"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/parvekirin/isler",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<CarPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts =
    data?.pages.flatMap((page) => {
      if ("items" in page && Array.isArray((page as any).items)) return (page as any).items;
      if ("posts" in page && Array.isArray((page as any).posts)) return (page as any).posts;
      return [];
    }) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        Henüz içerik paylaşılmadı.
      </p>
    );
  }

  if (status === "error") {
    return <p className="text-center text-destructive">Pirsgirek derket</p>;
  }

  return (
    <div className="space-y-5">
           <InfiniteScrollContainer
        className="space-y-5"
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      >
        {posts.map((post) => (
          <CarPost key={post.id} post={post} />
        ))}
        {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
      </InfiniteScrollContainer>
    </div>
  );
}
