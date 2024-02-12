"use client";
import style from "./followRecommend.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "@/model/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "../_lib/followUser";
import { unFollowUser } from "../_lib/unFollowUser";
import Link from "next/link";

type Props = {
  user: User;
};

const FollowRecommend = ({ user }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const isFollowing = !!user.Followers.find(
    (v) => v.id === session?.user?.email
  );

  const follow = useMutation({
    mutationFn: followUser,
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache
        .getAll()
        .map((cache) => cache.queryKey)
        .filter((key) => key[0] === "users");

      queryKeys.forEach((queryKey) => {
        const value: User | User[] | undefined =
          queryClient.getQueryData(queryKey);

        if (value && Array.isArray(value)) {
          const index = value.findIndex((v) => v.id === user.id);
          const shallow = [...value];

          if (index > -1) {
            shallow[index] = {
              ...shallow[index],
              Followers: [
                ...shallow[index].Followers,
                { id: session?.user?.email as string },
              ],
              _count: {
                ...shallow[index]._count,
                Followers: shallow[index]._count?.Followers + 1,
              },
            };
            queryClient.setQueryData(queryKey, shallow);
          }
        } else if (value) {
          const shallow = {
            ...value,
            Followers: [
              // ...value.Followers,
              { id: session?.user?.email as string },
            ],
            _count: {
              ...value._count,
              Followers: value._count?.Followers + 1,
            },
          };
          queryClient.setQueryData(queryKey, shallow);
        }
      });
    },
    onError: (error) => {
      alert(`에러 발생 팔로우 실패 ${error}`);
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache
        .getAll()
        .map((cache) => cache.queryKey)
        .filter((key) => key[0] === "users");

      queryKeys.forEach((queryKey) => {
        const value: User | User[] | undefined =
          queryClient.getQueryData(queryKey);

        if (value && Array.isArray(value)) {
          const index = value.findIndex((v) => v.id === user.id);
          const shallow = [...value];

          if (index > -1) {
            shallow[index] = {
              ...shallow[index],
              Followers: shallow[index].Followers.filter(
                (v) => v.id !== session?.user?.email
              ),
              _count: {
                ...shallow[index]._count,
                Followers: shallow[index]._count?.Followers - 1,
              },
            };
            queryClient.setQueryData(queryKey, shallow);
          }
        } else if (value) {
          const shallow = {
            ...value,
            Followers: value.Followers.filter(
              (v) => v.id !== session?.user?.email
            ),
            _count: {
              ...value._count,
              Followers: value._count?.Followers - 1,
            },
          };

          queryClient.setQueryData(queryKey, shallow);
        }
      });
    },
    onSettled: (data) => {
      // queryClient.invalidateQueries({queryKey: ["users"]})
      queryClient.invalidateQueries({ queryKey: ["posts", "followings"] });
    },
  });

  const unfollow = useMutation({
    mutationFn: unFollowUser,
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache
        .getAll()
        .map((cache) => cache.queryKey)
        .filter((key) => key[0] === "users");

      queryKeys.forEach((queryKey) => {
        const value: User | User[] | undefined =
          queryClient.getQueryData(queryKey);

        if (value && Array.isArray(value)) {
          const index = value.findIndex((v) => v.id === user.id);
          const shallow = [...value];

          if (index > -1) {
            shallow[index] = {
              ...shallow[index],
              Followers: shallow[index].Followers.filter(
                (v) => v.id !== session?.user?.email
              ),
              _count: {
                ...shallow[index]._count,
                Followers: shallow[index]._count?.Followers - 1,
              },
            };
            queryClient.setQueryData(queryKey, shallow);
          }
        } else if (value) {
          const shallow = {
            ...value,
            Followers: value.Followers.filter(
              (v) => v.id !== session?.user?.email
            ),
            _count: {
              ...value._count,
              Followers: value._count?.Followers - 1,
            },
          };

          queryClient.setQueryData(queryKey, shallow);
        }
      });
    },
    onError: (error) => {
      alert(`에러 발생 언팔로우 실패 ${error}`);
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache
        .getAll()
        .map((cache) => cache.queryKey)
        .filter((key) => key[0] === "users");

      queryKeys.forEach((queryKey) => {
        const value: User | User[] | undefined =
          queryClient.getQueryData(queryKey);

        if (value && Array.isArray(value)) {
          const index = value.findIndex((v) => v.id === user.id);
          const shallow = [...value];

          if (index > -1) {
            shallow[index] = {
              ...shallow[index],
              Followers: [
                ...shallow[index].Followers,
                { id: session?.user?.email as string },
              ],
              _count: {
                ...shallow[index]._count,
                Followers: shallow[index]._count?.Followers + 1,
              },
            };
            queryClient.setQueryData(queryKey, shallow);
          }
        } else if (value) {
          const shallow = {
            ...value,
            Followers: [
              // ...value.Followers,
              { id: session?.user?.email as string },
            ],
            _count: {
              ...value._count,
              Followers: value._count?.Followers + 1,
            },
          };

          queryClient.setQueryData(queryKey, shallow);
        }
      });
    },
    onSettled: () => {
      // queryClient.invalidateQueries({queryKey: ["users"]})
      queryClient.invalidateQueries({ queryKey: ["posts", "followings"] });
    },
  });

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!session?.user) {
      alert("로그인을 해주세요.");
      router.push("/");
      return;
    }

    if (isFollowing) {
      unfollow.mutate(user.id);
    } else {
      follow.mutate(user.id);
    }
  };

  return (
    <Link href={`/${user.id}`} className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div
        className={`${style.followButtonSection} ${
          isFollowing && style.followed
        }`}
      >
        <button onClick={onClick}>{isFollowing ? "팔로잉" : "팔로우"}</button>
      </div>
    </Link>
  );
};

export default FollowRecommend;
