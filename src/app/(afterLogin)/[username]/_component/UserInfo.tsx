"use client";

import style from "../profile.module.css";
import BackButton from "../../_component/BackButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/model/User";
import { getUser } from "../_lib/getUser";
import { useRouter } from "next/navigation";
import { followUser } from "../../_lib/followUser";
import { unFollowUser } from "../../_lib/unFollowUser";
import { Session } from "next-auth";

type Props = {
  username: string;
  session: Session | null;
};

const UserInfo = ({ username, session }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: user, error } = useQuery<
    User,
    Object,
    User,
    [_1: string, Props["username"]]
  >({
    queryKey: ["users", username],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div
          style={{
            height: 100,
            alignItems: "center",
            fontSize: 31,
            fontWeight: "bold",
            justifyContent: "center",
            display: "flex",
          }}
        >
          계정이 존재하지 않음
        </div>
      </>
    );
  }

  const isFollowing = !!user?.Followers?.find(
    (v) => v.id === session?.user?.email
  );
  console.log(isFollowing);
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
      console.log(error);
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
      unfollow.mutate(user!.id);
    } else {
      follow.mutate(user!.id);
    }
  };

  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>

        {session?.user?.email !== user.id && (
          <button
            className={`${style.followButton} ${isFollowing && style.followed}`}
            onClick={onClick}
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </button>
        )}
      </div>
    </>
  );
};

export default UserInfo;
