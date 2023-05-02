import ArticleCard from "../../../components/ArticleCard"

const Articles = () => {
  return (
    <section className="container mx-auto grid grid-cols-1 gap-y-12 xs:grid-cols-2 gap-x-12 lg:grid-cols-3 lg:gap-x-6 px-0 py-6 md:py-0 lg:-mt-6">
      <ArticleCard className="w-80 mx-auto xs:w-auto sm:w-full"/>
      <ArticleCard className="w-80 mx-auto xs:w-auto sm:w-full"/>
      <ArticleCard className="w-80 mx-auto xs:w-auto sm:w-full"/>
    </section>
  )
}

export default Articles
