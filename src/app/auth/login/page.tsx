import Image from "next/image";
import logo from '../../../../public/logo_dvkn.svg'
import H1 from "@components/Atoms/H1";
import { Input } from "@components/Atoms/ui/input";

export default function LoginPage() {
    return (
        <div className="w-4xl flex flex-col">
            <section className="py-6 flex justify-center">
                <Image src={logo} alt='logo' width={100} height={100} />
            </section>


            <H1 className="pb-6">Đăng nhập</H1>
            <section className="flex flex-col gap-2 mb-6">
                <p className="text-sm text-holder">Email</p>
                <Input placeholder="Nhập email" />
            </section>

            <section className="flex flex-col gap-2">
                <p className="text-sm text-holder">Mật khẩu</p>
                <Input placeholder="Nhập mật khẩu" />
            </section>
        </div >
    )
}