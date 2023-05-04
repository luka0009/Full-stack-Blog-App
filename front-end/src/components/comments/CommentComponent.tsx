import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import { Comment } from "../../types";

type Props = {
  comment: Comment;
  loggedInUserId?: string;
};

const CommentComponent = ({ comment, loggedInUserId }: Props) => {
  const isUserLoggedIn = Boolean(loggedInUserId);
  const commentBelongsToUser = loggedInUserId === comment.user._id;

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
        <p className="font-opensans mt-[10px] text-dark-light">
          {comment.desc}
        </p>
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          {isUserLoggedIn && (
            <button className="flex items-center space-x-2">
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {commentBelongsToUser && (
            <>
              <button className="flex items-center space-x-2">
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-2">
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
