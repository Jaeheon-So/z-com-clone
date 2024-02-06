export const getPostRecommends = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/recommends?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommends"],
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
