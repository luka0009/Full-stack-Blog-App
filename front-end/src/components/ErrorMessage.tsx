type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return (
      <div className="w-screen flex justify-center rounded-lg text-gray-900 bg-red-400 px-4 py-2 ml-[-45px]">
        <p className="mx-20 text-base md:text-xl">{message}</p>
      </div>
  );
};

export default ErrorMessage;
