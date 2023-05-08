import axios from "axios";

interface Props {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

export const signup = async ({ name, email, password }: Props) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/register",
      {
        name,
        email,
        password,
      }
    );
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }: LoginProps) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      {
        email,
        password,
      }
    );
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
