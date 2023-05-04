import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import { Comment } from "../../types";
import CommentForm from "./CommentForm";

type Props = {
  comment: Comment;
  loggedInUserId?: string;
  affectedComment?: { type: string; _id: string } | null;
  setAffectedComment?: any;
  addComment: (value: string, parent?: any, replyOnUser?: any) => void;
  updateComment: (value: string, commentId: string) => void;
  deleteComment: (commentId: string) => void,
  parentId?: string | null;
  replies: Comment[] 
};

const CommentComponent = ({
  comment,
  loggedInUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  updateComment,
  deleteComment,
  replies,
  parentId = null,
}: Props) => {
  const isUserLoggedIn = Boolean(loggedInUserId);
  const commentBelongsToUser = loggedInUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  return (
    <div className='"flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg'>
      <img
        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200"
        alt="profile"
        className="w-9 h-9 md:w-10 md:h-10 object-cover rounded-full"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {comment.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light">
            {comment.desc}
          </p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            initialText={comment.desc}
            formCancelHandler={() => setAffectedComment(null)}
            formSubmitHanlder={(value) => updateComment(value, comment._id)}
          />
        )}
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          {isUserLoggedIn && (
            <button
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
              className="flex items-center space-x-2"
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {commentBelongsToUser && (
            <>
              <button
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
                className="flex items-center space-x-2"
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button 
              onClick={() => deleteComment(comment._id)}
              className="flex items-center space-x-2"
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            initialText=""
            formCancelHandler={() => setAffectedComment(null)}
            formSubmitHanlder={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
          />
        )}
        {
          replies.length > 0 && (
            <div> 
              {replies.map((reply: Comment) => {
                return (
                  <CommentComponent 
                  key={reply._id}
                  addComment={addComment}
                  affectedComment={affectedComment}
                  setAffectedComment={setAffectedComment}
                  comment={reply}
                  deleteComment={deleteComment}
                  loggedInUserId={loggedInUserId}
                  replies={[]}
                  updateComment={updateComment}
                  parentId={comment._id}
                  />
                )
              })}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default CommentComponent;
