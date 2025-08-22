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
  phone: string;
  address: string;
  profession: string;
  firstName: string;
  lastName: string;
}) => {
  return axiosInstance.post("/auth/register", data);
};

// export const getUsersApi = () => {
//   return axiosInstance.get("/user/userlist");
// };

export const searchUsersApi = (search: string) => {
  return axiosInstance.get(`/user/userList${search ? `?name=${search}` : ""}`);
};

export const addExperienceApi = (data: {
  jobTitle: string;
  startDate: string;
  endDate: string;
  companyName: string;
  companyAddress: string;
  employmentType: string;
}) => {
  return axiosInstance.post("/profile/addExperience", data);
};

export const listMyExperiencesApi = () =>
  axiosInstance.get("/profile/listExperience");

export const getUserExperiencesApi = (userId: string) =>
  axiosInstance.get(`/profile/experience/${userId}`);

export const listMyEducationsApi = () =>
  axiosInstance.get("/profile/listEducation");

export const getUserEducationsApi = (userId: string) =>
  axiosInstance.get(`/profile/education/${userId}`);

export const updateUserApi = (
  userId: string,
  data: {
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    address?: string;
    profession?: string;
  }
) => {
  return axiosInstance.patch(`/user/editUser/${userId}`, data);
};
