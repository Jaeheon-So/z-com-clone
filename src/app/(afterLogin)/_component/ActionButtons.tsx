"use client";

import { Post } from "@/model/Post";
import CommentSvg from "../_svg/CommentSvg";
import HeartSvg from "../_svg/HeartSvg";
import RepostSvg from "../_svg/RepostSvg";
import style from "./actionButtons.module.css";
import { useSession } from "next-auth/react";
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteHeart } from "../_lib/deleteHeart";
import { addHeart } from "../_lib/addHeart";

type Props = {
  white?: boolean;
  post: Post;
};

const ActionButtons = ({ white, post }: Props) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const commented = !!post.Comments?.find(
    (v) => v.userId === session?.user?.email
  );
  const reposted = !!post.Reposts?.find(
    (v) => v.userId === session?.user?.email
  );
  const liked = !!post.Hearts?.find((v) => v.userId === session?.user?.email);

  const heart = useMutation({
    mutationFn: addHeart,
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache
        .getAll()
        .map((cache) => cache.queryKey)
        .filter((key) => key[0] === "posts");
      const previousData: {
        queryKey: QueryKey;
        data: Post | InfiniteData<Post[]> | undefined;
      }[] = [];

      queryKeys.forEach((queryKey) => {
        const value: Post | InfiniteData<Post[]> | undefined =
          queryClient.getQueryData(queryKey);

        if (value && "pages" in value) {
          const obj = value.pages.flat().find((v) => v.postId === post.postId);
          if (obj) {
            const pageIndex = value.pages.findIndex((page) =>
              page.includes(obj)
            );
            const index = value.pages[pageIndex].findIndex(
              (v) => v.postId === post.postId
            );
            const shallow = { ...value };

            value.pages = { ...value.pages };
            value.pages[pageIndex] = [...value.pages[pageIndex]];
            shallow.pages[pageIndex][index] = {
              ...shallow.pages[pageIndex][index],
              Hearts: [{ userId: session?.user?.email as string }],
              _count: {
                ...shallow.pages[pageIndex][index]._count,
                Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
              },
            };
            previousData.push({
              queryKey: queryKey,
              data: value,
            });
            queryClient.setQueryData(queryKey, shallow);
          }
        } else if (value) {
          if (value.postId === post.postId) {
            const shallow = {
              ...value,
              Hearts: [{ userId: session?.user?.email as string }],
              _count: {
                ...value._count,
                Hearts: value._count.Hearts + 1,
              },
            };
            previousData.push({
              queryKey: queryKey,
              data: value,
            });
            queryClient.setQueryData(queryKey, shallow);
          }
        }
      });
      return { previousData };
    },
    onError: (err, _, context) => {
      alert("에러 발생 좋아요 실패");
      //방법 1
      // context?.previousData.forEach((v) => {
      //   queryClient.setQueryData(v.queryKey, v.data)
      // })

      //방법2
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache
        .getAll()
        .map((cache) => cache.queryKey)
        .filter((key) => key[0] === "posts");

      queryKeys.forEach((queryKey) => {
        const value: Post | InfiniteData<Post[]> | undefined =
          queryClient.getQueryData(queryKey);

        if (value && "pages" in value) {
          const obj = value.pages.flat().find((v) => v.postId === post.postId);
          if (obj) {
            const pageIndex = value.pages.findIndex((page) =>
              page.includes(obj)
            );
            const index = value.pages[pageIndex].findIndex(
              (v) => v.postId === post.postId
            );
            const shallow = { ...value };

            value.pages = { ...value.pages };
            value.pages[pageIndex] = [...value.pages[pageIndex]];
            shallow.pages[pageIndex][index] = {
              ...shallow.pages[pageIndex][index],
              Hearts: shallow.pages[pageIndex][index].Hearts.filter(
                (v) => v.userId !== session?.user?.email
              ),
              _count: {
                ...shallow.pages[pageIndex][index]._count,
                Hearts: shallow.pages[pageIndex][index]._count.Hearts - 1,
              },
            };
            queryClient.setQueryData(queryKey, shallow);
          }
        } else if (value) {
          if (value.postId === post.postId) {
            const shallow = {
              ...value,
              Hearts: value.Hearts.filter(
                (v) => v.userId !== session?.user?.email
              ),
              _count: {
                ...value._count,
                Hearts: value._count.Hearts - 1,
              },
            };
            queryClient.setQueryData(queryKey, shallow);
          }
        }
      });
    },
    onSettled: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ['posts']
      // })
    },
  });

  const unheart = useMutation({
    mutationFn: deleteHeart,
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache
        .getAll()
        .map((cache) => cache.queryKey)
        .filter((key) => key[0] === "posts");
      const previousData: {
        queryKey: QueryKey;
        data: Post | InfiniteData<Post[]> | undefined;
      }[] = [];

      queryKeys.forEach((queryKey) => {
        const value: Post | InfiniteData<Post[]> | undefined =
          queryClient.getQueryData(queryKey);

        if (value && "pages" in value) {
          const obj = value.pages.flat().find((v) => v.postId === post.postId);
          if (obj) {
            const pageIndex = value.pages.findIndex((page) =>
              page.includes(obj)
            );
            const index = value.pages[pageIndex].findIndex(
              (v) => v.postId === post.postId
            );
            const shallow = { ...value };

            value.pages = { ...value.pages };
            value.pages[pageIndex] = [...value.pages[pageIndex]];
            shallow.pages[pageIndex][index] = {
              ...shallow.pages[pageIndex][index],
              Hearts: shallow.pages[pageIndex][index].Hearts.filter(
                (v) => v.userId !== session?.user?.email
              ),
              _count: {
                ...shallow.pages[pageIndex][index]._count,
                Hearts: shallow.pages[pageIndex][index]._count.Hearts - 1,
              },
            };
            previousData.push({
              queryKey: queryKey,
              data: value,
            });
            queryClient.setQueryData(queryKey, shallow);
          }
        } else if (value) {
          if (value.postId === post.postId) {
            const shallow = {
              ...value,
              Hearts: value.Hearts.filter(
                (v) => v.userId !== session?.user?.email
              ),
              _count: {
                ...value._count,
                Hearts: value._count.Hearts - 1,
              },
            };
            previousData.push({
              queryKey: queryKey,
              data: value,
            });
            queryClient.setQueryData(queryKey, shallow);
          }
        }
      });
      return { previousData };
    },
    onError: (err, _, context) => {
      alert("에러 발생 좋아요 해제 실패");
      //방법 1
      // context?.previousData.forEach((v) => {
      //   queryClient.setQueryData(v.queryKey, v.data)
      // })

      //방법2
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache
        .getAll()
        .map((cache) => cache.queryKey)
        .filter((key) => key[0] === "posts");

      queryKeys.forEach((queryKey) => {
        const value: Post | InfiniteData<Post[]> | undefined =
          queryClient.getQueryData(queryKey);

        if (value && "pages" in value) {
          const obj = value.pages.flat().find((v) => v.postId === post.postId);
          if (obj) {
            const pageIndex = value.pages.findIndex((page) =>
              page.includes(obj)
            );
            const index = value.pages[pageIndex].findIndex(
              (v) => v.postId === post.postId
            );
            const shallow = { ...value };

            value.pages = { ...value.pages };
            value.pages[pageIndex] = [...value.pages[pageIndex]];
            shallow.pages[pageIndex][index] = {
              ...shallow.pages[pageIndex][index],
              Hearts: [{ userId: session?.user?.email as string }],
              _count: {
                ...shallow.pages[pageIndex][index]._count,
                Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
              },
            };
            queryClient.setQueryData(queryKey, shallow);
          }
        } else if (value) {
          if (value.postId === post.postId) {
            const shallow = {
              ...value,
              Hearts: [{ userId: session?.user?.email as string }],
              _count: {
                ...value._count,
                Hearts: value._count.Hearts + 1,
              },
            };
            queryClient.setQueryData(queryKey, shallow);
          }
        }
      });
    },
    onSettled: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ['posts']
      // })
    },
  });

  const onClickComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  const onClickRepost = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const onClickHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (liked) {
      unheart.mutate(post.postId);
    } else {
      heart.mutate(post.postId);
    }
  };

  return (
    <div className={style.actionButtons}>
      <div
        className={`${style.commentButton} ${commented && style.commented} ${
          white && style.white
        }`}
      >
        <button onClick={onClickComment}>
          <CommentSvg />
        </button>
        <div className={style.count}>{post._count.Comments || ""}</div>
      </div>
      <div
        className={`${style.repostButton} ${reposted && style.reposted} ${
          white && style.white
        }`}
      >
        <button onClick={onClickRepost}>
          <RepostSvg />
        </button>
        <div className={style.count}>{post._count.Reposts || ""}</div>
      </div>
      <div
        className={`${style.heartButton} ${liked && style.liked} ${
          white && style.white
        }`}
      >
        <button onClick={onClickHeart}>
          <HeartSvg />
        </button>
        <div className={style.count}>{post._count.Hearts || ""}</div>
      </div>
    </div>
  );
};

export default ActionButtons;
