import { Link, useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import SuggestedPosts from "./container/SuggestedPosts";
import Comments from "../../components/comments/Comments";
import SocialShareButtons from "../../components/SocialShareButtons";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getSinglePost } from "../../services/posts";
import { useState } from "react";
import stables from "../../constants/stables";
import images from "../../constants/images";
import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import parse from "html-react-parser";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { useAppSelector } from "../../store/hooks";

interface BrCrumbs {
  name: string;
  link: string;
}

const ArticleDetail = () => {
  const { slug } = useParams();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [breadCrumbsData, setbreadCrumbsData] = useState<BrCrumbs[]>([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setbreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: "Article title", link: `/blog/${data.slug}` },
      ]);
      setBody(
        //@ts-expect-error
        parse(
          generateHTML(data?.body, [Bold, Italic, Text, Paragraph, Document])
        )
      );
      console.log(data);
    },
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Unable to retrieve the post" />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />
            <img
              src={
                data?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                  : images.blogpost
              }
              alt={data?.title}
              className="rounded-xl w-full h-[300px] md:h-[430px] object-fill"
            />
            <div className="mt-4 flex gap-2">
              {data?.categories.map((category: any) => {
                return (
                  <Link
                    to={`/blog?category=${category.name}`}
                    className="text-primary text-sm font-roboto inline-block md:text-base"
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
            <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
              {data?.title}
            </h1>
            <div className="mt-4 prose prose-sm sm:prose-base">
              {parse(`${body}`)}
            </div>
            <Comments
              className="mt-10"
              loggedInUserId={userInfo?._id}
              comments={data?.comments}
              postSlug={slug}
            />
          </article>
          <div>
            <SuggestedPosts
              className="mt-8 lg:mt-12 bg-gray-100 lg:max-w-xs"
              header="Latest articles"
              tags={data?.tags}
              posts={postsData}
            />
            {/* <div className="mt-7">
            <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-lg">
              Share on:
            </h2>
            <SocialShareButtons
            />
          </div> */}
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ArticleDetail;
