import Link from "next/link";
import style from "@/app/(afterLogin)/_component/post.module.css";

type Props = {
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: any[];
  };
};

const PostImages = ({ post }: Props) => {
  // const index = Math.floor(Math.random() * 3);

  // if (!post.Images) return null;
  // if (!post.Images.length) return null;

  return (
    <Link
      href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0]?.imageId}`}
      className={style.postImageSection}
    >
      <img src={post.Images[0]?.link} alt="img" />
    </Link>
  );
};

export default PostImages;
