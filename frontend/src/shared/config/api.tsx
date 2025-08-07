import axiosInstance from "./axiosinstance";

// export  function loginApi(data : { username: string, password: string}){
//     return axios.post('http://localhost:3000/api/auth/login', data)
// }

export const loginApi = (data: { username: string; password: string }) => {
  return axiosInstance.post("/auth/login", data);
};
export const registerApi = (data: {
  username: string;
  password: string;
  email: string;
}) => {
  return axiosInstance.post("/auth/register", data);
};

// export const getUsersApi = () => {
//   return axiosInstance.get("/user/userlist");
// };

export const searchUsersApi = (search: string) => {
  return axiosInstance.get(`/user/userList${search ? `?name=${search}` : ""}`);
};
