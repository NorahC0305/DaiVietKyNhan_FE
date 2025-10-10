import Header from "@components/Molecules/Header";
import NotFoundPageClient from "@pages/Public/NotFoundPage";
import userService from "@services/user";
import { IUser } from "@models/user/entity";

export default async function NotFound() {
    const user = await userService.getMe() as IUser;
    return (
        <>
            <Header user={user} />
            <NotFoundPageClient />
        </>
    )
}