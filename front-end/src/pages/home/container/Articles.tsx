import ArticleCard from "../../../components/ArticleCard"
import { FaArrowRight } from 'react-icons/fa';

const Articles = () => {
  return (
    <section className="flex flex-col container mx-auto px-0 py-6 md:py-0 lg:-mt-6">
      <div className="pb-10 grid grid-cols-1 gap-y-12 xs:grid-cols-2 gap-x-12 lg:grid-cols-3 lg:gap-x-6">
      <ArticleCard className="w-80 mx-auto xs:w-auto sm:w-full"/>
      <ArticleCard className="w-80 mx-auto xs:w-auto sm:w-full"/>
      <ArticleCard className="w-80 mx-auto xs:w-auto sm:w-full"/>
      </div>
      <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg">
        <span>More articles</span>
        <FaArrowRight className="w-3 h-3" />
      </button>
    </section>
  )
}

export default Articles
