import axios from "axios";
import { PostFormInputs } from "../types";

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/posts/");
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const DeletePost = async ({ slug, token }: any) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:5000/api/posts/${slug}`,
      config
    );
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSinglePost = async ({ slug }: any) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/posts/${slug}`);
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createPost = async ({
  title,
  caption,
  tags,
  text,
  token,
}: PostFormInputs) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/posts/`,
      {
        title,
        caption,
        tags,
        text,
      },
      config
    );
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
