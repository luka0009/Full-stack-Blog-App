import CommentForm from "./CommentForm"
import { getCommentsData } from "../../data/comments";
import { useEffect, useState } from "react";
import { Comment } from "../../types";
import CommentComponent from "./CommentComponent";

type Props = {
    className: string,
    loggedInUserId: string;
}

const Comments = ({ className, loggedInUserId }: Props) => {
  const [comments, setComments] = useState<Comment[] | null>(null); 
  const mainComments = comments?.filter((comment) => comment.parent === null)


  console.log(comments);

  useEffect(() => {
    (async() => {
        const commentsData: Comment[] = await getCommentsData();
        setComments(commentsData);
    })()
  }, []);
    
  const addCommentHandler = (value: string, parent = null, replyOnUser = null) => {
    const newComment = {
            _id: "10",
            user: {
              _id: "a",
              name: "Jemal baghasjvili",
            },
            desc: value,
            post: "1",
            parent: parent,
            replyOnUser: replyOnUser,
            createdAt: "2022-12-31T17:22:05.092+0000",
    }
    setComments((state: Comment[] | null) => {
        return [newComment, ...(state || [])];
      });
  };

  return (
    <div className={`${className}`}>
        <CommentForm btnLabel="Post" initialText="" formCancelHandler={null} formSubmitHanlder={(value) => addCommentHandler(value)}/>
        <div className="space-y-4 mt-8">
            {mainComments?.map((comment) => {
                return (
                    <CommentComponent 
                    key={comment._id}
                    comment={comment}
                    loggedInUserId={loggedInUserId}
                    />
                )
            })}
        </div>    
    </div>
  )
}

export default Comments