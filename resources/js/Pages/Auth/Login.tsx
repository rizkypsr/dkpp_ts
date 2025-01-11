import { FormEventHandler, useState } from "react";
import Checkbox from "@/components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Eye, EyeIcon, EyeOff } from "lucide-react";

const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/dkpp1.jpg",
    "/images/dkpp2.jpg",
    "/images/dkpp3.jpg",
    "/images/dkpp4.jpg",
    "/images/dkpp5.jpg",
];

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="relative">
            <Carousel
                opts={{
                    loop: true,
                }}
                className="w-full h-full"
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
            >
                <CarouselContent className="h-screen">
                    {images.map((link) => (
                        <CarouselItem>
                            <img
                                src={link}
                                alt="Image"
                                className="object-cover w-full h-full"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <GuestLayout>
                <Head title="Log in" />

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="username" value="NIP" />

                        <TextInput
                            id="username"
                            type="text"
                            name="username"
                            value={data.username}
                            className="block w-full mt-1"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.username}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <div className="relative">
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                className="block w-full mt-1"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <button type="button" className="absolute right-3 top-0 bottom-0" onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? "Hide" : "Show"
                                }
                            </button>
                        </div>

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="text-sm text-gray-600 ms-2">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="mt-4">
                        {/* {canResetPassword && (
                <Link
                    href={route("password.request")}
                    className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Forgot your password?
                </Link>
            )} */}

                        <Button className="w-full" disabled={processing}>
                            Log in
                        </Button>
                    </div>
                </form>

                <div className="mt-8 mr-6 text-xs text-center text-white flex justify-center">
                    <img src="/images/logo2.png" alt="Logo" className="w-32" />
                </div>
            </GuestLayout>

            <section className="py-16 my-40 bg-gray-300">
                <div className="flex flex-col items-center max-w-sm mx-auto space-y-12 lg:max-w-5xl lg:flex-row lg:space-y-0 lg:space-x-12 md:max-w-xl xl:max-w-6xl">
                    <div className="relative lg:w-[30%]">
                        <div className="absolute bottom-0 left-0 right-0 h-64 bg-neutral-700 rounded-tr-xl rounded-b-3xl rounded-tl-[4rem] lg:w-[80%] mx-auto"></div>
                        <img
                            src="/images/opd.png"
                            alt="OPD"
                            className="relative z-10 mx-auto"
                        />
                    </div>

                    <div className="md:w-[70%]">
                        <h1 className="mb-4 text-3xl font-semibold text-center lg:text-left">
                            Sambutan Pimpinan
                        </h1>
                        <p className="mb-6 text-lg text-justify">
                            Assalammualaikum Wr. Wb. Puji Syukur kepada Allah
                            SWT. yang telah melimpahkan Rahmat dan HidayahNya
                            kepada kita semua. Sebuah kebanggan bagi Dinas
                            Ketahanan Pangan dan Perikanan Kabupaten Jombang
                            sebagai unsur pelaksana pemerintah di bidang
                            Ketahanan Pangan dan Perikanan dapat memberikan
                            informasi mengenai pelayanan publik yang
                            diselenggarakan pada Bidang Ketahanan Pangan dan
                            Perikanan melaui Website ini. Terima Kasih kepada
                            semua pihak yang telah memberikan dukungan dalam
                            membuat dan menyusun website ini. Semoga Website ini
                            bisa memberikan manfaat yang sebesar-besarnya.
                            Wassalamualaikum Wr.Wb.
                        </p>
                        <h2 className="text-lg font-semibold">
                            N RD Nurkamalia, S.KM, MSi
                        </h2>
                        <h3 className="text-lg">Kepala OPD</h3>
                    </div>
                </div>
            </section>

            <footer className="px-24 pt-24 text-white bg-[#21262c]">
                <div className="flex items-center justify-center mb-20 space-x-6">
                    <img src="/images/logo.png" alt="Logo" className="w-20" />
                    <div className="text-xl font-medium">
                        <p>Dinas Ketahanan Pangan dan Perikanan</p>
                        <p>Kabupaten Jombang</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between mb-20 space-y-10 xl:flex-row xl:space-y-0">
                    <img
                        src="https://dkpp.jombangkab.go.id/assets/main/img/LogoBerAKHLAK.png"
                        alt="BerAKHLAK"
                        className="w-64"
                    />
                    <img
                        src="https://dkpp.jombangkab.go.id/assets/main/img/banggaMelayaniBangsas.png"
                        alt="BerAKHLAK"
                        className="w-80"
                    />
                    <img
                        src="/images/logo2.png"
                        alt="LOGO"
                        className="w-44 xl:mr-20"
                    />
                    <img
                        src="https://dkpp.jombangkab.go.id/assets/main/img/LOGOJOMBANGFEST2024.png"
                        alt="LOGOJOMBANGFEST2024"
                        className="w-44"
                    />
                    <img
                        src="https://dkpp.jombangkab.go.id/assets/main/img/LOGOHARIJADIJOMBANGKE114.png"
                        alt="LOGOHARIJADIJOMBANGKE114"
                        className="w-44"
                    />
                    <img
                        src="https://dkpp.jombangkab.go.id/assets/main/img/logo-branding.png"
                        alt="LOGOHARIJADIJOMBANGKE114"
                        className="w-64"
                    />
                </div>
                <div className="container py-4 mx-auto text-center">
                    <p className="mb-2 mb-lg-0">
                        © 2024 KOMINFO JOMBANG. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
