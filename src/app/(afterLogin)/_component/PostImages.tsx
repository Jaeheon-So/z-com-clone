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
  const stopPropagation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const imageLengthData: {
    [key: string]: {
      className: string;
      style: { backgroundSize: string };
    };
  } = {
    "1": {
      className: `${style.postImageSection} ${style.oneImage}`,
      style: {
        backgroundSize: "contain",
      },
    },
    "2": {
      className: `${style.postImageSection} ${style.twoImage}`,
      style: {
        backgroundSize: "cover",
      },
    },
    "3": {
      className: `${style.postImageSection} ${style.threeImage}`,
      style: {
        backgroundSize: "cover",
      },
    },
    "4": {
      className: `${style.postImageSection} ${style.fourImage}`,
      style: {
        backgroundSize: "cover",
      },
    },
  };

  if (!post.Images) return null;

  if (!post.Images.length) return null;

  if (post.Images.length === 1) {
    return (
      <Link
        href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
        className={`${style.postImageSection} ${style.oneImage}`}
        style={{
          backgroundImage: `url(${post.Images[0]?.link})`,
          backgroundSize: "contain",
        }}
        onClick={stopPropagation}
      >
        <img src={post.Images[0]?.link} alt="" />
      </Link>
    );
  }

  if (post.Images.length === 3) {
    return (
      <div className={`${style.postImageSection} ${style.threeImage}`}>
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[0]?.link})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
          onClick={stopPropagation}
        ></Link>
        <div>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
            style={{
              backgroundImage: `url(${post.Images[1]?.link})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
            onClick={stopPropagation}
          ></Link>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
            style={{
              backgroundImage: `url(${post.Images[2]?.link})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
            onClick={stopPropagation}
          ></Link>
        </div>
      </div>
    );
  }

  return (
    <div className={imageLengthData[post.Images.length.toString()].className}>
      {post.Images.map((img) => (
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${img.imageId}`}
          style={{
            ...imageLengthData[post.Images.length].style,
            backgroundImage: `url(${img.link})`,
            backgroundPosition: "center center",
          }}
          key={img.imageId}
          onClick={stopPropagation}
        ></Link>
      ))}
    </div>
  );
};

export default PostImages;
