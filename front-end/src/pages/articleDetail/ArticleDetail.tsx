import { Link } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import SuggestedPosts from "./container/SuggestedPosts";
import Comments from "../../components/comments/Comments";

const ArticleDetail = () => {
  const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blog" },
    { name: "Article title", link: `/blog/1` },
  ];

  const postsData = [
    {
      _id: "1",
      image:
        "https://media.istockphoto.com/id/667718500/vector/3d-small-people-all-is-well.jpg?s=612x612&w=is&k=20&c=MgR85_Y0Jxg5YWdO0COKt0WceuA-L1qlMHXB4INq5ik=",
      title: "Lorem ipsum dolor sit amet.",
      createdAt: "2023-01-28T15:35:53.607+0000",
    },
    {
      _id: "2",
      image:
        "https://media.istockphoto.com/id/667718500/vector/3d-small-people-all-is-well.jpg?s=612x612&w=is&k=20&c=MgR85_Y0Jxg5YWdO0COKt0WceuA-L1qlMHXB4INq5ik=",
      title: "Lorem ipsum dolor sit amet.",
      createdAt: "2023-01-28T15:35:53.607+0000",
    },
    {
      _id: "3",
      image:
        "https://media.istockphoto.com/id/667718500/vector/3d-small-people-all-is-well.jpg?s=612x612&w=is&k=20&c=MgR85_Y0Jxg5YWdO0COKt0WceuA-L1qlMHXB4INq5ik=",
      title: "Lorem ipsum dolor sit amet.",
      createdAt: "2023-01-28T15:35:53.607+0000",
    },
    {
      _id: "4",
      image:
        "https://media.istockphoto.com/id/667718500/vector/3d-small-people-all-is-well.jpg?s=612x612&w=is&k=20&c=MgR85_Y0Jxg5YWdO0COKt0WceuA-L1qlMHXB4INq5ik=",
      title: "Lorem ipsum dolor sit amet.",
      createdAt: "2023-01-28T15:35:53.607+0000",
    },
  ];

  const tagsData = [
    "Medical",
    "Lifestyle",
    "Learn",
    "Healthy",
    "Food",
    "Diet",
    "Education",
  ];

  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img
            src="data:image/jpeg;base64,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"
            alt="dog image"
            className="rounded-xl w-full"
          />
          <Link
            to="/blog?category=selectedCategory"
            className="text-primary text-sm font-roboto inline-block mt-4 md:text-base"
          >
            categoryName
          </Link>
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae in, inventore rem fuga cumque est magnam eveniet vitae
              veniam illum molestiae reiciendis, doloribus iure quisquam!
            </p>
          </div>
          <Comments className="mt-10"/>
        </article>
        <SuggestedPosts
          className="mt-8 lg:mt-12 bg-gray-100 lg:max-w-xs"
          header="Latest articles"
          tags={tagsData}
          posts={postsData}
        />
      </section>
    </MainLayout>
  );
};

export default ArticleDetail;
