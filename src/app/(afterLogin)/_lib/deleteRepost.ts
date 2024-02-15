export const deleteRepost = async (postId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/reposts`,
    {
      method: "delete",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res;
};
