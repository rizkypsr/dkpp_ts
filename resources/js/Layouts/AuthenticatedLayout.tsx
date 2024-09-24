import { PropsWithChildren } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Blocks,
    Bolt,
    BookText,
    Dock,
    File,
    Home,
    PanelLeft,
    Printer,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/toaster";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header: string }>) {
    const { url, props } = usePage();

    const isActivePath = (path: string) => url.startsWith(path);

    return (
        <div className="flex flex-col w-full min-h-screen bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 flex-col hidden border-r bg-background sm:flex">
                <div className="flex flex-col h-full max-h-screen">
                    <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6 bg-[#181824] text-white">
                        <Link href="/" className="font-semibold">
                            <span className="">DKPP</span>
                        </Link>
                    </div>
                    <div className="flex-1 bg-[#1E1E2D] py-6 text-muted-foreground">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-y-3">
                            <Link
                                href={route("dashboard")}
                                className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${
                                    isActivePath("/dashboard")
                                        ? "text-white"
                                        : ""
                                }`}
                            >
                                <Home className="w-4 h-4" />
                                Dashboard
                            </Link>
                            <Link
                                href={route("data-master.index")}
                                className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${
                                    isActivePath("/data-master")
                                        ? "text-white"
                                        : ""
                                }`}
                            >
                                <Blocks className="w-4 h-4" />
                                Data Master
                            </Link>
                            <Link
                                href={route("data-laporan-renaksi.index")}
                                className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${
                                    isActivePath("/data-laporan-renaksi")
                                        ? "text-white"
                                        : ""
                                }`}
                            >
                                <Bolt className="w-4 h-4" />
                                Data Laporan Renaksi
                            </Link>
                            <Link
                                href={route("data-laporan-monev-renaksi.index")}
                                className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${
                                    isActivePath("/data-laporan-monev-renaksi")
                                        ? "text-white"
                                        : ""
                                }`}
                            >
                                <BookText className="w-4 h-4" />
                                Data Laporan Monev Renaksi
                            </Link>
                            <Link
                                href={route("data-laporan-kurja.index")}
                                className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${
                                    isActivePath("/data-laporan-kurja")
                                        ? "text-white"
                                        : ""
                                }`}
                            >
                                <Dock className="w-4 h-4" />
                                Data Laporan Kurja
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${isActivePath('dashboard') ? 'text-white' : ''}"
                            >
                                <File className="w-4 h-4" />
                                Laporan
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${isActivePath('dashboard') ? 'text-white' : ''}"
                            >
                                <Printer className="w-4 h-4" />
                                Cetak Laporan
                            </Link>
                        </nav>
                    </div>
                </div>
            </aside>

            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-[17rem]">
                <header className="sticky top-0 z-30 flex items-center gap-4 px-4 border-b h-14 bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                className="sm:hidden"
                            >
                                <PanelLeft className="w-5 h-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 px-2 text-sm font-medium lg:px-4">
                                <Link
                                    href={route("dashboard")}
                                    className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:font-bold ${
                                        isActivePath("/dashboard")
                                            ? "text-white"
                                            : ""
                                    }`}
                                >
                                    <Home className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <Link
                                    href={route("data-master.index")}
                                    className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:font-bold ${
                                        isActivePath("/data-master")
                                            ? "font-extrabold"
                                            : ""
                                    }`}
                                >
                                    <Blocks className="w-4 h-4" />
                                    Data Master
                                </Link>
                                <Link
                                    href={route("data-laporan-renaksi.index")}
                                    className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:font-bold ${
                                        isActivePath("/data-laporan-renaksi")
                                            ? "text-white"
                                            : ""
                                    }`}
                                >
                                    <Bolt className="w-4 h-4" />
                                    Data Laporan Renaksi
                                </Link>
                                <Link
                                    href={route(
                                        "data-laporan-monev-renaksi.index"
                                    )}
                                    className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:font-bold ${
                                        isActivePath(
                                            "/data-laporan-monev-renaksi"
                                        )
                                            ? "text-white"
                                            : ""
                                    }`}
                                >
                                    <BookText className="w-4 h-4" />
                                    Data Laporan Monev Renaksi
                                </Link>
                                <Link
                                    href={route("data-laporan-kurja.index")}
                                    className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:font-bold ${
                                        isActivePath("/data-laporan-kurja")
                                            ? "text-white"
                                            : ""
                                    }`}
                                >
                                    <Dock className="w-4 h-4" />
                                    Data Laporan Kurja
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:font-bold ${isActivePath('dashboard') ? 'text-white' : ''}"
                                >
                                    <File className="w-4 h-4" />
                                    Laporan
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:font-bold ${isActivePath('dashboard') ? 'text-white' : ''}"
                                >
                                    <Printer className="w-4 h-4" />
                                    Cetak Laporan
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="ml-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex flex-col pl-2 text-sm font-semibold border-l cursor-pointer">
                                    <div>{props.auth.user.name}</div>
                                    <div className="text-xs">
                                        {props.auth.user.nip}
                                    </div>
                                    {/* <span>{props.auth.user.roles[0].name}</span> */}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link
                                        href={route("logout")}
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
                </header>

                <main className="flex-1 p-4 sm:px-6 sm:py-0">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {header}
                    </h2>

                    {children}
                </main>
            </div>

            <Toaster />
        </div>
    );
}
