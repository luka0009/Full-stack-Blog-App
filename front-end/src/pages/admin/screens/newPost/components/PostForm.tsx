import { useForm, FieldValues } from "react-hook-form";
import { useAppSelector } from "../../../../../store/hooks";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../../../../services/posts";
import toast from "react-hot-toast";
import Tiptap from "./Tiptap";
import { PostFormInputs } from "../../../../../types";

const ErrorMessage = ({ message }: { message: string }) => (
  <p className="text-red-500 text-xs mt-1">{message}</p>
);

const PostForm = () => {
  const text = useAppSelector((state) => state.post.text);
  const [tags, setTags] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const token = userInfo.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      caption: "",
      tags: tags,
      text: text,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (text) {
      setValue("text", text);
    }
  }, [text, setValue]);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ title, caption, tags, text, token }: PostFormInputs) => {
      return createPost({ title, caption, tags, text, token });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(`post added succecsfully`);
      queryClient.invalidateQueries(["blog", data.slug]);
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`);
      console.log(error);
    },
  });

  const handleFormSubmit = (data: any) => {
    const { tags, ...restData } = data;
    const tagsArray = tags.split(",").map((tag: string) => tag.trim());
    const newData = {
      ...restData,
      tags: tagsArray,
    };
    const { title, caption, text } = newData;
    mutate({ title, caption, tags, text, token });
    console.log(newData, text);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col mb-6 w-full">
          <label htmlFor="title" className="text-[#5a7184] font-semibold block">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", {
              minLength: {
                value: 1,
                message: "Name be at least 1 character",
              },
              required: {
                value: true,
                message: "Title is required",
              },
            })}
            placeholder="Your post title"
            className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg 
                px-5 py-4 font-semibold block outline-none border ${
                  errors.title ? "border-red-500" : "border-[#c3cad9]"
                }`}
          />
          {errors.title?.message && (
            <ErrorMessage message={errors.title?.message as string} />
          )}
        </div>

        <div className="flex flex-col mb-6 w-full">
          <label
            htmlFor="caption"
            className="text-[#5a7184] font-semibold block"
          >
            caption
          </label>
          <input
            type="text"
            id="caption"
            {...register("caption")}
            placeholder="Your post caption"
            className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg 
                px-5 py-4 font-semibold block outline-none border ${
                  errors.caption ? "border-red-500" : "border-[#c3cad9]"
                }`}
          />
          {errors.caption?.message && (
            <ErrorMessage message={errors.caption?.message as string} />
          )}
        </div>

        <div className="flex flex-col mb-6 w-full">
          <label htmlFor="tags" className="text-[#5a7184] font-semibold block">
            Tags (seperate with commas)
          </label>
          <input
            type="text"
            id="tags"
            {...register("tags", {
              validate: (value) => {
                const tagsArray = value
                  .split(",")
                  .map((tag: string) => tag.trim());
                setTags([...tagsArray]);
                return tagsArray.length > 0 || "At least one tag is required";
              },
            })}
            placeholder="tag 1, tag 2, ... "
            className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg 
        px-5 py-4 font-semibold block outline-none border ${
          errors.tags ? "border-red-500" : "border-[#c3cad9]"
        }`}
          />
          {errors.tags && (
            <ErrorMessage message={errors.tags.message as string} />
          )}
        </div>
        <ul className="list-disc ml-4 text-lg font-bold">
          <li className="mb-2">There is a sample text in the box</li>
          <li className="mb-2">
            To create new post, just delete text in editor and create your
            custom text
          </li>
        </ul>
        <Tiptap />
        <button
          type="submit"
          className="bg-primary mt-2 text-white font-bold text-lg py-3 px-1 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
