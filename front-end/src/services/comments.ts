import axios from "axios";

interface CommentDataProps {
  desc: string;
  slug: string | undefined;
  parent: string | null;
  replyOnUser: string | null;
  token: any;
};

export const createComment = async ({
  token,
  desc,
  slug,
  parent,
  replyOnUser,
}: CommentDataProps) => {
  try {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

    const { data } = await axios.post(`http://localhost:5000/api/comments`, {
        desc,
        slug,
        parent,
        replyOnUser,
    }, config);
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
