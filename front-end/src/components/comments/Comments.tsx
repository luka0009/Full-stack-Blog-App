import CommentForm from "./CommentForm";
import { getCommentsData } from "../../data/comments";
import { useEffect, useState } from "react";
import { Comment } from "../../types";
import CommentComponent from "./CommentComponent";

type Props = {
  className: string;
  loggedInUserId: string;
  comments: Comment[];
};

const Comments = ({ className, loggedInUserId, comments }: Props) => {

  const [affectedComment, setAffectedComment] = useState(null);
  
  const addCommentHandler = (
    value: string,
    parent = null,
    replyOnUser = null
  ) => {
    setAffectedComment(null);
  };

  const updateCommentHandler = (value: string, commentId: string) => {
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId: string) => {
  }

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Post"
        initialText=""
        formSubmitHanlder={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {comments?.map((comment) => {
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
              //@ts-ignore
              replies={comment?.replies}
              // parentId={comment._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
