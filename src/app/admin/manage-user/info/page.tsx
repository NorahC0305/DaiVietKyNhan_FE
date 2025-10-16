import { IMePaginationResponse } from "@models/user/response";
import UserInfoPage from "@pages/Admin/User/UserInfo";
import userService from "@services/user";

export default async function UserInfoServer() {
  const listUsers = await userService.getUsers() as IMePaginationResponse;

  return (
    <>
      <UserInfoPage
        listUsers={listUsers.data}
      />
    </>
  );
}
