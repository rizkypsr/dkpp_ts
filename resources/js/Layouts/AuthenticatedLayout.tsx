import { PropsWithChildren } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sidebar from "@/components/Sidebar";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header: string }>) {
    const { props } = usePage();

    return (
        <div className="antialiased bg-gray-50">
            <nav className="bg-[#F44336] shadow-sm shadow-[#F44336] px-4 py-2.5 fixed left-0 right-0 top-0 z-50 text-white">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        <button
                            data-drawer-target="drawer-navigation"
                            data-drawer-toggle="drawer-navigation"
                            aria-controls="drawer-navigation"
                            className="p-2 mr-2 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-700"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <svg
                                aria-hidden="true"
                                className="hidden w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="sr-only">Toggle sidebar</span>
                        </button>
                        <Link href="/" className="font-semibold md:flex md:items-center gap-3 hidden">
                            <img src="/images/logo.png" alt="Logo" className="w-8" />
                            <img src="/images/logo2.png" alt="Logo" className="w-12" />
                            <div className="">DASHBOARD DKPP</div>
                        </Link>
                    </div>
                    <div className="flex items-center lg:order-2">
                        {/* Dropdown menu */}
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex flex-col pl-2 text-sm font-semibold border-l cursor-pointer text-white">
                                        <div className="font-bold">{props.auth.user.name}</div>
                                        <div className="text-xs">
                                            {props.auth.user.nip}
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route("logout")}
                                            className="w-full cursor-pointer"
                                            method="post"
                                            as="button"
                                            replace={true}
                                        >
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <Sidebar />

            <main className="pl-4 pr-7 md:ml-72 h-auto pt-24 pb-24">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {header}
                </h2>

                {children}

                <footer className="bg-[#2196F3] text-white p-4 fixed bottom-0 w-full flex justify-center sm:justify-end right-0 left-0">
                    <p>&copy; DKPP KABUPATEN JOMBANG {new Date().getFullYear()}</p>
                </footer>
            </main>
        </div>
    );
}