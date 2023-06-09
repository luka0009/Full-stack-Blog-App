import { FormEvent, useState } from "react";
import { useAppSelector } from "../../store/hooks";

interface Props {
  btnLabel: string;
  formSubmitHanlder: (value: string, parent?: any, replyOnUser?: any) => void;
  formCancelHandler?: any;
  initialText?: string;
  loading?: boolean,
}

const CommentForm = ({
  btnLabel,
  formSubmitHanlder,
  formCancelHandler = null,
  loading = false,
  initialText = "",
}: Props) => {
  const [value, setValue] = useState<string>(initialText);
  const userInfo = useAppSelector(state => state.user.userInfo);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmitHanlder(value);
    setValue("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4">
        <textarea
          placeholder={userInfo ? "Leave your comment here..." : "Please Log In to leave the comment"}
          className="w-full focus:outline-none bg-transparent"
          rows={5}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
        ></textarea>
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              className="px-6 py-2.5 rounded-lg border border-red-500 text-red-500"
            >
              Cancel
            </button>
          )}
          <button
            disabled={loading || !userInfo}
            type="submit"
            className={`px-6 py-2.5 rounded-lg bg-primary
             text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
