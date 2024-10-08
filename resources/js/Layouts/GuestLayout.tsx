import ApplicationLogo from "@/components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center h-screen bg-black bg-opacity-10">
            <div>
                <Link href="/">
                    <h1 className="text-2xl font-semibold text-white">
                        DKPP Jombang
                    </h1>
                </Link>
            </div>

            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
