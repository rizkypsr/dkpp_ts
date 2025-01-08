import {
    Blocks,
    BookText,
    Dock,
    File,
    Home,
    Printer,
} from "lucide-react";
import NavLink from "./NavLink";
import { usePage } from "@inertiajs/react";

export default function Sidebar() {
    const { url } = usePage();

    const isActivePath = (path: string) => url.startsWith(path);

    const links = [
        { href: route("dashboard"), path: "/dashboard", icon: <Home className="w-4 h-4" />, label: "Dashboard" },
        { href: route("data-master.index"), path: "/data-master", icon: <Blocks className="w-4 h-4" />, label: "Data Master" },
        { href: route("data-laporan-monev-renaksi.index"), path: "/data-laporan-monev-renaksi", icon: <BookText className="w-4 h-4" />, label: "Data Laporan Monev Renaksi" },
        { href: route("data-laporan-kurja.index"), path: "/data-laporan-kurja", icon: <Dock className="w-4 h-4" />, label: "Data Laporan Kurja" },
        { href: route("laporan.index"), path: "/laporan", icon: <File className="w-4 h-4" />, label: "Laporan" },
        { href: route("cetak-laporan.index"), path: "/cetak-laporan", icon: <Printer className="w-4 h-4" />, label: "Cetak Laporan" },
    ];

    return (
        <aside
            className="fixed top-0 left-0 z-40 w-72 h-screen pt-4 transition-transform -translate-x-full md:translate-x-0 shadow-lg shadow-emerald-600"
            aria-label="Sidenav"
            id="drawer-navigation"
        >
            <div className="overflow-y-auto py-5 px-3 h-full bg-emerald-600">
                <ul className="pt-5 mt-5 space-y-5">
                    {links.map((link, index) => (
                        <NavLink
                            key={index}
                            href={link.href}
                            active={isActivePath(link.path)}
                        >
                            {link.icon}
                            <span className="ml-3">{link.label}</span>
                        </NavLink>
                    ))}
                </ul>
            </div>
        </aside>
    );
}