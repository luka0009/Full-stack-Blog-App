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

interface GetUserProps {
  token: string;
}

interface UpdateProps {
  token: string;
  userData: any;
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
    const { data } = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getUserProfile = async ({ token }: GetUserProps) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:5000/api/users/profile",
      config
    );
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProfile = async ({ token, userData }: UpdateProps) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.patch(
      "http://localhost:5000/api/users/updateprofile",
      userData,
      config
    );
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
