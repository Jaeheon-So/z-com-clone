export const getTrends = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trends`, {
    next: {
      tags: ["trends"],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
