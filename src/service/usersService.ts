import axios from "axios";
import { RequestSaveUser, ResponseGetUsers, ResponseSaveUser } from "../interface/users/usersInterface";

export const getUsersService = async () => {
  return await axios.get<ResponseGetUsers>(`https://jsonplaceholder.typicode.com/users`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const saveUserService = async (body: RequestSaveUser) => {
  return await axios.post<ResponseSaveUser>(`http://httpbin.org/post`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};