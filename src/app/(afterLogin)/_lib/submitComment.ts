export const submitComment = async (arg: {
  formData: FormData;
  postId: number | undefined;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${arg.postId}/comments`,
    {
      method: "post",
      credentials: "include",
      body: arg.formData,
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
