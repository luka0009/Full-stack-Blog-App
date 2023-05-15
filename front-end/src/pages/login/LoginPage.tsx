//@ts-nocheck
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { useForm, FieldValues } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { login } from "../../services/users";
import toast from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setUserInfo } from "../../store/features/user/userSlice";
import { useEffect } from "react";

const LoginPage = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
        return login({ email, password })
    },
    onSuccess: (data) => {
        console.log(data);
        dispatch(setUserInfo(data));
        localStorage.setItem('user', JSON.stringify(data));
    },
    onError:(error) => {
        toast.error(`Error: ${error.message}`);
        console.lof(error);
    }
  });

  useEffect(() => {
    if(userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleFormSubmit = (data: any) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-soft mb-8">
            Sign In
          </h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter a valid email",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                placeholder="e.g someone123@example.com"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg 
                px-5 py-4 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                    required: {
                      value: true,
                      message: "Please enter your password",
                    },
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 charachters',
                    }
                  })}
                placeholder="Enter your password here"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg 
                px-5 py-4 font-semibold block outline-none border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <Link to="/" className="text-sm font-semibold text-primary mb-12">
              Forgot password?
            </Link>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="bg-primary mt-2 text-white font-bold text-lg py-3 px-1 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Sign in
            </button>
            <p className="text-sm font-semibold text-dark-hard">
              Do not have an account?
              <Link to="/register" className="text-primary underline mx-1">
                Sign up here
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginPage;
