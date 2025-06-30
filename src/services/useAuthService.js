import useAxiosPublic from "../hooks/useAxiosPublic";


export const useAuthService = () => {
  const axiosPublic = useAxiosPublic();

  const loginUser = async (data) => {
    const res = await axiosPublic.post('/auth/login', data);
    return res.data;
  };

  const registerUser = async (data) => {
    const res = await axiosPublic.post('/auth/register', data);
    return res.data;
  };

  const logOutUser = async () => {
    const res = await axiosPublic.post('/auth/logout');
    return res.data;
    }

  return { loginUser, registerUser, logOutUser };
};
