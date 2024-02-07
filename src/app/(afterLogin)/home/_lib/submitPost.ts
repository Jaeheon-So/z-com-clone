export const submitPost = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    method: "post",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
