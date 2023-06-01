import CommentForm from "./CommentForm";
import { useState } from "react";
import { Comment } from "../../types";
import CommentComponent from "./CommentComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../services/comments";
import { useAppSelector } from "../../store/hooks";
import { toast } from "react-hot-toast";

type Props = {
  className: string;
  loggedInUserId: string;
  comments: Comment[];
  postSlug: string | undefined;
};

interface CommentDataProps {
  desc: string;
  slug: string | undefined;
  parent: string | null;
  replyOnUser: string | null;
  token: any;
}

const Comments = ({ className, loggedInUserId, comments, postSlug }: Props) => {
  const [affectedComment, setAffectedComment] = useState(null);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const queryClient = useQueryClient();

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({
        token, desc, slug, parent, replyOnUser,
      }: CommentDataProps) => {
        return createComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: () => {
        toast.success(`Comment added succecsfully`);
        queryClient.invalidateQueries(["blog", postSlug]);
      },
      onError: (error: any) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const { mutate: mutateUpdateComment } = useMutation({
    mutationFn: ({
      token,
      desc,
      commentId,
    }: {
      token: string;
      desc: string;
      commentId: string;
    }) => {
      return updateComment({ token, desc, commentId });
    },
    onSuccess: () => {
      toast.success(`Comment updated succecsfully`);
      queryClient.invalidateQueries(["blog", postSlug]);
    },
    onError: (error: any) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: ({
      token,
      commentId,
    }: {
      token: string;
      commentId: string;
    }) => {
      return deleteComment({ token, commentId });
    },
    onSuccess: () => {
      toast.success(`Comment deleted succecsfully`);
      queryClient.invalidateQueries(["blog", postSlug]);
    },
    onError: (error: any) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const addCommentHandler = (
    value: string,
    parent = null,
    replyOnUser = null
  ) => {
    setAffectedComment(null);
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userInfo?.token,
      slug: postSlug,
    });
  };

  const updateCommentHandler = (value: string, commentId: string) => {
    setAffectedComment(null);
    mutateUpdateComment({
      desc: value,
      token: userInfo?.token,
      commentId: commentId,
    });
  };

  const deleteCommentHandler = (commentId: string) => {
    mutateDeleteComment({ token: userInfo?.token, commentId });
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Post"
        initialText=""
        formSubmitHanlder={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
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
