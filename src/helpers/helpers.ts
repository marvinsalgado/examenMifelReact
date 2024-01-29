import { ResponseGetUsers } from "../interface/users/usersInterface";


export const toInputUppercase = (e: React.ChangeEvent<HTMLInputElement>) => {
  const originalValue = e.target.value;
  e.target.value = originalValue.toUpperCase();
};

export const getNextID =(array: ResponseGetUsers[]) =>{
  let maxId = 0;

  array.forEach(item => {
    if (item.id > maxId) {
      maxId = item.id;
    }
  });

  return maxId + 1;
}
