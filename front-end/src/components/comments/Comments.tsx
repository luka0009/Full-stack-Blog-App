import CommentForm from "./CommentForm";
import { getCommentsData } from "../../data/comments";
import { useEffect, useState } from "react";
import { Comment } from "../../types";
import CommentComponent from "./CommentComponent";

type Props = {
  className: string;
  loggedInUserId: string;
};

const Comments = ({ className, loggedInUserId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const mainComments = comments?.filter((comment) => comment.parent === null);
  const [affectedComment, setAffectedComment] = useState(null);

  console.log(comments);

  useEffect(() => {
    (async () => {
      const commentsData: Comment[] = await getCommentsData();
      setComments(commentsData);
    })();
  }, []);

  const addCommentHandler = (
    value: string,
    parent = null,
    replyOnUser = null
  ) => {
    const newComment = {
      _id: Math.random().toString(),
      user: {
        _id: "a",
        name: "Jemal baghasjvili",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: new Date().toISOString(),
    };
    setComments((state: Comment[] | null) => {
      return [newComment, ...(state || [])];
    });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value: string, commentId: string) => {
    const updatedComments: Comment[] = comments?.map((comment) => {
      if (comment._id === commentId) {
        return { ...comment, desc: value };
      }
      return comment;
    });
    setComments(updatedComments);
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId: string) => {
    const updatedComments: Comment[] | null = comments?.map((comment) => {
      if (comment._id !== commentId) {
        return comment;
      }
      return null;
    }).filter(comment => comment !== null) as Comment[]; 
    setComments(updatedComments);
  }

  const getRepliesHandler = (commentId: string) => {
    return comments.filter((comment) => {
      return comment.parent === commentId;
    }).sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  }

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Post"
        initialText=""
        formSubmitHanlder={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {mainComments?.map((comment) => {
          return (
            <CommentComponent
              key={comment._id}
              comment={comment}
              loggedInUserId={loggedInUserId}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addComment={addCommentHandler}
              updateComment={updateCommentHandler}
              deleteComment={deleteCommentHandler}
              replies={getRepliesHandler(comment._id)}
              // parentId={comment._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
