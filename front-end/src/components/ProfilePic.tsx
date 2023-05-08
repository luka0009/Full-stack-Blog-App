import stables from "../constants/stables";
import { HiOutlineCamera } from "react-icons/hi";

type Props = {
  avatar: string;
};

const ProfilePic = ({ avatar }: Props) => {
  return (
    <div className="w-full flex items-center gap-x-4 mb-5">
      <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 outline-primary overflow-hidden">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
        >
          {avatar ? (
            <img
              src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
              <HiOutlineCamera className="w-7 h-auto text-primary" />
            </div>
          )}
        </label>
        <input
          type="file"
          className="sr-only"
          id="profilePicture"
          onChange={() => console.log("aslkdj")}
        />
      </div>
      <button
        onClick={() => console.log("aslkdj")}
        type="button"
        className="border border-red-500 rounded-lg px-4 py-2 text-red-500"
      >
        Delete
      </button>
    </div>
  );
};

export default ProfilePic;
