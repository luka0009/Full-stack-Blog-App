import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSinglePost, updatePost } from "../../../services/posts";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArticleDetailSkeleton from "../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";
import { useEffect, useState } from "react";
import Tiptap from "./newPost/components/Tiptap";
import stables from "../../../constants/stables";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../../../store/hooks";

const EditPost = () => {
	const userInfo = useAppSelector((state) => state.user.userInfo);
	const text = useAppSelector(state => state.post.text);
	const queryClient = useQueryClient();
	const { slug } = useParams();
	const [initialPhoto, setInitialPhoto] = useState(null);
	const [photo, setPhoto] = useState<any>(null);
	const navigate = useNavigate();
	// const [body, setBody] = useState(null);

	const { data, isLoading, isError } = useQuery({
		queryFn: () => getSinglePost({ slug }),
		queryKey: ["blog", slug],
	});

	const { mutate: mutateUpdatePost, isLoading: updateIsLoading } = useMutation({
		mutationFn: ({ updatedData, slug, token }: any) => {
			return updatePost({ updatedData, slug, token });
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries(["blog", slug]);
			toast.success("Post is updated");
		},
		onError: (error: any) => {
			toast.error(error.message);
			console.log(error);
		},
	});

	useEffect(() => {
		setInitialPhoto(data?.photo);
	}, [data, isError, isLoading]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		//@ts-ignore
		const file = e.target.files[0];

		setPhoto(file);
	};

	const handleUpdatePost = async () => {
		let updatedData = new FormData();

		if (!initialPhoto && photo) {
			updatedData.append("postPicture", photo);
		} else if (initialPhoto && !photo) {
			const urlToObject = async (url: string) => {
				let response = await fetch(url);
				const blob = await response.blob();

				const file = new File([blob], initialPhoto, { type: blob.type });
				return file;
			};

			const picture = await urlToObject(
				stables.UPLOAD_FOLDER_BASE_URL + data?.photo
			);

			updatedData.append("postPicture", picture);
		}

		const jsondata = {
			"body": {
			  "type": "doc",
			  "content": [
				{
				  "type": "text",
				  "text": text
				}
			  ]
			}
		  };

		updatedData.append(
			"document",
			JSON.stringify(jsondata));

		mutateUpdatePost({ updatedData, slug, token: userInfo.token });

		navigate(`/blog/${slug}`);
	};

	console.log(data?.body?.content[0].text, 'aslkdjaskldjkasljda');

	const handleDeleteImage = () => {
		if (window.confirm("Do you want to delete this Post picture?")) {
			setInitialPhoto(null);
			setPhoto(null);
		}
	};

	return (
		<div>
			{isLoading ? (
				<ArticleDetailSkeleton />
			) : isError ? (
				<ErrorMessage message="Unable to retrieve the post" />
			) : (
				<section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
					<article className="flex-1">
						<label htmlFor="postPicture" className="w-full cursor-pointer">
							{photo ? (
								<img
									src={URL.createObjectURL(photo)}
									alt={data?.title}
									className="rounded-xl w-full"
								/>
							) : initialPhoto ? (
								<img
									src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
									alt={data?.title}
									className="rounded-xl w-full"
								/>
							) : (
								<div className="w-full h-[200px] bg-blue-50/50 flex justify-center items-center">
									<HiOutlineCamera className="text-center w-10 h-auto text-primary" />
								</div>
							)}
						</label>
						<input
							type="file"
							className="sr-only"
							id="postPicture"
							onChange={handleFileChange}
						/>
						{(initialPhoto || photo) && (
							<button
								type="button"
								onClick={handleDeleteImage}
								className="mt-5 w-fit bg-orange-500 font-semibold rounded-lg px-2 py-1 text-lg"
							>
								Delete this Image and update
							</button>
						)}

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
							{/* {parse(`${data?.body?.content[0].text}`)} */}
							<Tiptap body={data?.body?.content[0].text} />
						</div>
						<button
							disabled={updateIsLoading}
							type="button"
							onClick={handleUpdatePost}
							className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2
							disabled:cursor-not-allowed disabled:opacity-70
							"
						>
							Update Post
						</button>
					</article>
				</section>
			)}
		</div>
	);
};

export default EditPost;
