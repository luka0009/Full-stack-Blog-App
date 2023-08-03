import { useQuery } from "@tanstack/react-query";
import ArticleCard from "../../../components/ArticleCard";
import { FaArrowRight } from "react-icons/fa";
import { getAllPosts } from "../../../services/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";

const Articles = () => {
	const { data, isLoading, isError } = useQuery({
		queryFn: () => getAllPosts(),
		queryKey: ["posts"],
		onError: (error: any) => {
			toast.error(error.message);
			console.log(error);
		},
	});
  
	return (
		<section className="flex flex-col container mx-auto px-5 py-6 md:py-0 lg:-mt-6">
			<div className="pb-10 grid grid-cols-1 gap-y-12 xs:grid-cols-2 gap-x-12 lg:grid-cols-3 lg:gap-x-6">
				{isLoading ? (
					[...Array(3)].map((_item, index) => (
						<ArticleCardSkeleton
							key={index}
							className="w-80 mx-auto xs:w-auto sm:w-full"
						/>
					))
				) : isError ? (
					<ErrorMessage message="Couldn't retrieve posts 😢" />
				) : (
					data?.data.map((post: any) => {
						return (
							<ArticleCard
								key={post._id}
								post={post}
								className="w-80 mx-auto xs:w-auto sm:w-full"
							/>
						);
					})
				)}
			</div>
			<button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg">
				<span>More articles</span>
				<FaArrowRight className="w-3 h-3" />
			</button>
		</section>
	);
};

export default Articles;
