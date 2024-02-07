export const getTrends = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hashtags/trends`,
    {
      next: {
        tags: ["trends"],
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.log(res);
    throw new Error("failed to fetch data");
  }

  return res.json();
};
