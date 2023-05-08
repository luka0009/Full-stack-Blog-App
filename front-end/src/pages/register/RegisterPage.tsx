//@ts-nocheck
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { useForm, FieldValues } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { signup } from "../../services/index/users";
import toast from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setUserInfo } from "../../store/features/user/userSlice";
import { useEffect } from "react";

const RegisterPage = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
        return signup({ name, email, password })
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
    formState: { errors, isValid },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const handleFormSubmit = (data: any) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  const password = watch('password');

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-soft mb-8">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Name be at least 1 character",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                placeholder="e.g Kate"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg 
                px-5 py-4 font-semibold block outline-none border ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
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
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Please repeat your password",
                    },
                    validate: (value) => {
                        if(value !== password) {
                            return 'Passwords do not match';
                        }
                    }
                  })}
                placeholder="Repeat your password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg 
                px-5 py-4 font-semibold block outline-none border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword?.message}
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
              Register
            </button>
            <p className="text-sm font-semibold text-dark-hard">
              Already have an account?{" "}
              <Link to="/login" className="text-primary underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
