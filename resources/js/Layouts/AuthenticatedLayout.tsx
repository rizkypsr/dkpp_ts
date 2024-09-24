import { useState, PropsWithChildren, ReactNode } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
    Bell,
    Blocks,
    Bolt,
    BookText,
    CircleUser,
    Dock,
    File,
    Home,
    LineChart,
    Menu,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    Printer,
    Search,
    Settings,
    ShoppingCart,
    Users,
    Users2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Toaster } from "@/Components/ui/toaster";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header: string }>) {
    const { url, props } = usePage();

    const isActivePath = (path: string) => url.startsWith(path);

    // return (
    //     <div className="flex w-full min-h-screen bg-red-100">
    //         <aside className="hidden border-r shrink-0 bg-background md:block">
    //             <div className="flex flex-col h-full max-h-screen">
    //                 <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6 bg-[#181824] text-white">
    //                     <Link href="/" className="font-semibold">
    //                         <span className="">DKPP</span>
    //                     </Link>
    //                 </div>
    //                 <div className="flex-1 bg-[#1E1E2D] py-6 text-muted-foreground">
    //                     <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-y-3">
    //                         <Link
    //                             href={route("dashboard")}
    //                             className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${
    //                                 isActivePath("/dashboard")
    //                                     ? "text-white"
    //                                     : ""
    //                             }`}
    //                         >
    //                             <Home className="w-4 h-4" />
    //                             Dashboard
    //                         </Link>
    //                         <Link
    //                             href={route("data-master.index")}
    //                             className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${
    //                                 isActivePath("/data-master")
    //                                     ? "text-white"
    //                                     : ""
    //                             }`}
    //                         >
    //                             <Blocks className="w-4 h-4" />
    //                             Data Master
    //                         </Link>
    //                         <Link
    //                             href="#"
    //                             className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${
    //                                 isActivePath("/data-laporan-renaksi")
    //                                     ? "text-white"
    //                                     : ""
    //                             }`}
    //                         >
    //                             <Bolt className="w-4 h-4" />
    //                             Data Laporan Renaksi
    //                         </Link>
    //                         <Link
    //                             href="#"
    //                             className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${isActivePath('dashboard') ? 'text-white' : ''}"
    //                         >
    //                             <BookText className="w-4 h-4" />
    //                             Data Laporan Monev Renaksi
    //                         </Link>
    //                         <Link
    //                             href="#"
    //                             className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${isActivePath('dashboard') ? 'text-white' : ''}"
    //                         >
    //                             <Dock className="w-4 h-4" />
    //                             Data Laporan Kurja
    //                         </Link>
    //                         <Link
    //                             href="#"
    //                             className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${isActivePath('dashboard') ? 'text-white' : ''}"
    //                         >
    //                             <File className="w-4 h-4" />
    //                             Laporan
    //                         </Link>
    //                         <Link
    //                             href="#"
    //                             className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white ${isActivePath('dashboard') ? 'text-white' : ''}"
    //                         >
    //                             <Printer className="w-4 h-4" />
    //                             Cetak Laporan
    //                         </Link>
    //                     </nav>
    //                 </div>
    //             </div>
    //         </aside>
    //         <div className="flex flex-col flex-1">
    //             <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between md:justify-end">
    //                 <Sheet>
    //                     <SheetTrigger asChild>
    //                         <Button
    //                             variant="outline"
    //                             size="icon"
    //                             className="shrink-0 md:hidden"
    //                         >
    //                             <Menu className="w-5 h-5" />
    //                             <span className="sr-only">
    //                                 Toggle navigation menu
    //                             </span>
    //                         </Button>
    //                     </SheetTrigger>
    //                     <SheetContent
    //                         side="left"
    //                         className="flex flex-col"
    //                         aria-describedby="Navigation"
    //                     >
    //                         <SheetTitle></SheetTitle>
    //                         <nav className="grid gap-2 text-lg font-medium">
    //                             <Link
    //                                 href="#"
    //                                 className="flex items-center gap-2 text-lg font-semibold"
    //                             >
    //                                 <Package2 className="w-6 h-6" />
    //                                 <span className="sr-only">Acme Inc</span>
    //                             </Link>
    //                             <Link
    //                                 href="#"
    //                                 className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //                             >
    //                                 <Home className="w-5 h-5" />
    //                                 Dashboard
    //                             </Link>
    //                             <Link
    //                                 href="#"
    //                                 className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
    //                             >
    //                                 <ShoppingCart className="w-5 h-5" />
    //                                 Orders
    //                             </Link>
    //                             <Link
    //                                 href="#"
    //                                 className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //                             >
    //                                 <Package className="w-5 h-5" />
    //                                 Products
    //                             </Link>
    //                             <Link
    //                                 href="#"
    //                                 className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //                             >
    //                                 <Users className="w-5 h-5" />
    //                                 Customers
    //                             </Link>
    //                             <Link
    //                                 href="#"
    //                                 className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    //                             >
    //                                 <LineChart className="w-5 h-5" />
    //                                 Analytics
    //                             </Link>
    //                         </nav>
    //                     </SheetContent>
    //                 </Sheet>
    //                 <DropdownMenu>
    //                     <DropdownMenuTrigger asChild>
    //                         <Button variant="ghost" className="">
    //                             <p className="underline uppercase">
    //                                 {props.auth.user.name ?? "-"}
    //                             </p>
    //                             <span className="sr-only">
    //                                 Toggle user menu
    //                             </span>
    //                         </Button>
    //                     </DropdownMenuTrigger>
    //                     <DropdownMenuContent align="end">
    //                         <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //                         <DropdownMenuSeparator />
    //                         <DropdownMenuItem>Settings</DropdownMenuItem>
    //                         <DropdownMenuItem>Support</DropdownMenuItem>
    //                         <DropdownMenuSeparator />
    //                         <DropdownMenuItem>
    //                             <Link
    //                                 href={route("logout")}
    //                                 method="post"
    //                                 as="button"
    //                                 replace={true}
    //                             >
    //                                 Logout
    //                             </Link>
    //                         </DropdownMenuItem>
    //                     </DropdownMenuContent>
    //                 </DropdownMenu>
    //             </header>

    //             {/* <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    //                 <div className="flex items-center">
    //                     <h2 className="text-xl font-semibold leading-tight text-gray-800">
    //                         {header}
    //                     </h2>
    //                 </div>
    //                 <div>{children}</div>
    //             </main> */}
    //             <main className="p-4">
    //                 <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    //                     <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
    //                         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //                             <tr>
    //                                 <th scope="col" className="p-4">
    //                                     <div className="flex items-center">
    //                                         <input
    //                                             id="checkbox-all-search"
    //                                             type="checkbox"
    //                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                                         />
    //                                         <label
    //                                             htmlFor="checkbox-all-search"
    //                                             className="sr-only"
    //                                         >
    //                                             checkbox
    //                                         </label>
    //                                     </div>
    //                                 </th>
    //                                 <th scope="col" className="px-6 py-3">
    //                                     Product name
    //                                 </th>
    //                                 <th scope="col" className="px-6 py-3">
    //                                     Color
    //                                 </th>
    //                                 <th scope="col" className="px-6 py-3">
    //                                     Category
    //                                 </th>
    //                                 <th scope="col" className="px-6 py-3">
    //                                     Accessories
    //                                 </th>
    //                                 <th scope="col" className="px-6 py-3">
    //                                     Available
    //                                 </th>
    //                                 <th scope="col" className="px-6 py-3">
    //                                     Price
    //                                 </th>
    //                                 <th scope="col" className="px-6 py-3">
    //                                     Weight
    //                                 </th>
    //                                 <th scope="col" className="px-6 py-3">
    //                                     Action
    //                                 </th>
    //                             </tr>
    //                         </thead>
    //                         <tbody>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //                                 <td className="w-4 p-4">
    //                                     <div className="flex items-center">
    //                                         <input
    //                                             id="checkbox-table-search-1"
    //                                             type="checkbox"
    //                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                                         />
    //                                         <label
    //                                             htmlFor="checkbox-table-search-1"
    //                                             className="sr-only"
    //                                         >
    //                                             checkbox
    //                                         </label>
    //                                     </div>
    //                                 </td>
    //                                 <th
    //                                     scope="row"
    //                                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                                 >
    //                                     Apple MacBook Pro 17"
    //                                 </th>
    //                                 <td className="px-6 py-4">Silver</td>
    //                                 <td className="px-6 py-4">Laptop</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">$2999</td>
    //                                 <td className="px-6 py-4">3.0 lb.</td>
    //                                 <td className="flex items-center px-6 py-4">
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //                                     >
    //                                         Edit
    //                                     </a>
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
    //                                     >
    //                                         Remove
    //                                     </a>
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //                                 <td className="w-4 p-4">
    //                                     <div className="flex items-center">
    //                                         <input
    //                                             id="checkbox-table-search-2"
    //                                             type="checkbox"
    //                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                                         />
    //                                         <label
    //                                             htmlFor="checkbox-table-search-2"
    //                                             className="sr-only"
    //                                         >
    //                                             checkbox
    //                                         </label>
    //                                     </div>
    //                                 </td>
    //                                 <th
    //                                     scope="row"
    //                                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                                 >
    //                                     Microsoft Surface Pro
    //                                 </th>
    //                                 <td className="px-6 py-4">White</td>
    //                                 <td className="px-6 py-4">Laptop PC</td>
    //                                 <td className="px-6 py-4">No</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">$1999</td>
    //                                 <td className="px-6 py-4">1.0 lb.</td>
    //                                 <td className="flex items-center px-6 py-4">
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //                                     >
    //                                         Edit
    //                                     </a>
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
    //                                     >
    //                                         Remove
    //                                     </a>
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //                                 <td className="w-4 p-4">
    //                                     <div className="flex items-center">
    //                                         <input
    //                                             id="checkbox-table-search-3"
    //                                             type="checkbox"
    //                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                                         />
    //                                         <label
    //                                             htmlFor="checkbox-table-search-3"
    //                                             className="sr-only"
    //                                         >
    //                                             checkbox
    //                                         </label>
    //                                     </div>
    //                                 </td>
    //                                 <th
    //                                     scope="row"
    //                                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                                 >
    //                                     Magic Mouse 2
    //                                 </th>
    //                                 <td className="px-6 py-4">Black</td>
    //                                 <td className="px-6 py-4">Accessories</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">No</td>
    //                                 <td className="px-6 py-4">$99</td>
    //                                 <td className="px-6 py-4">0.2 lb.</td>
    //                                 <td className="flex items-center px-6 py-4">
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //                                     >
    //                                         Edit
    //                                     </a>
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
    //                                     >
    //                                         Remove
    //                                     </a>
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //                                 <td className="w-4 p-4">
    //                                     <div className="flex items-center">
    //                                         <input
    //                                             id="checkbox-table-search-3"
    //                                             type="checkbox"
    //                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                                         />
    //                                         <label
    //                                             htmlFor="checkbox-table-search-3"
    //                                             className="sr-only"
    //                                         >
    //                                             checkbox
    //                                         </label>
    //                                     </div>
    //                                 </td>
    //                                 <th
    //                                     scope="row"
    //                                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                                 >
    //                                     Apple Watch
    //                                 </th>
    //                                 <td className="px-6 py-4">Black</td>
    //                                 <td className="px-6 py-4">Watches</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">No</td>
    //                                 <td className="px-6 py-4">$199</td>
    //                                 <td className="px-6 py-4">0.12 lb.</td>
    //                                 <td className="flex items-center px-6 py-4">
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //                                     >
    //                                         Edit
    //                                     </a>
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
    //                                     >
    //                                         Remove
    //                                     </a>
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //                                 <td className="w-4 p-4">
    //                                     <div className="flex items-center">
    //                                         <input
    //                                             id="checkbox-table-search-3"
    //                                             type="checkbox"
    //                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                                         />
    //                                         <label
    //                                             htmlFor="checkbox-table-search-3"
    //                                             className="sr-only"
    //                                         >
    //                                             checkbox
    //                                         </label>
    //                                     </div>
    //                                 </td>
    //                                 <th
    //                                     scope="row"
    //                                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                                 >
    //                                     Apple iMac
    //                                 </th>
    //                                 <td className="px-6 py-4">Silver</td>
    //                                 <td className="px-6 py-4">PC</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">$2999</td>
    //                                 <td className="px-6 py-4">7.0 lb.</td>
    //                                 <td className="flex items-center px-6 py-4">
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //                                     >
    //                                         Edit
    //                                     </a>
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
    //                                     >
    //                                         Remove
    //                                     </a>
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //                                 <td className="w-4 p-4">
    //                                     <div className="flex items-center">
    //                                         <input
    //                                             id="checkbox-table-search-3"
    //                                             type="checkbox"
    //                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                                         />
    //                                         <label
    //                                             htmlFor="checkbox-table-search-3"
    //                                             className="sr-only"
    //                                         >
    //                                             checkbox
    //                                         </label>
    //                                     </div>
    //                                 </td>
    //                                 <th
    //                                     scope="row"
    //                                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                                 >
    //                                     Apple AirPods
    //                                 </th>
    //                                 <td className="px-6 py-4">White</td>
    //                                 <td className="px-6 py-4">Accessories</td>
    //                                 <td className="px-6 py-4">No</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">$399</td>
    //                                 <td className="px-6 py-4">38 g</td>
    //                                 <td className="flex items-center px-6 py-4">
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //                                     >
    //                                         Edit
    //                                     </a>
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
    //                                     >
    //                                         Remove
    //                                     </a>
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //                                 <td className="w-4 p-4">
    //                                     <div className="flex items-center">
    //                                         <input
    //                                             id="checkbox-table-search-3"
    //                                             type="checkbox"
    //                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                                         />
    //                                         <label
    //                                             htmlFor="checkbox-table-search-3"
    //                                             className="sr-only"
    //                                         >
    //                                             checkbox
    //                                         </label>
    //                                     </div>
    //                                 </td>
    //                                 <th
    //                                     scope="row"
    //                                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                                 >
    //                                     iPad Pro
    //                                 </th>
    //                                 <td className="px-6 py-4">Gold</td>
    //                                 <td className="px-6 py-4">Tablet</td>
    //                                 <td className="px-6 py-4">No</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">$699</td>
    //                                 <td className="px-6 py-4">1.3 lb.</td>
    //                                 <td className="flex items-center px-6 py-4">
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //                                     >
    //                                         Edit
    //                                     </a>
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
    //                                     >
    //                                         Remove
    //                                     </a>
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //                                 <td className="w-4 p-4">
    //                                     <div className="flex items-center">
    //                                         <input
    //                                             id="checkbox-table-search-3"
    //                                             type="checkbox"
    //                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                                         />
    //                                         <label
    //                                             htmlFor="checkbox-table-search-3"
    //                                             className="sr-only"
    //                                         >
    //                                             checkbox
    //                                         </label>
    //                                     </div>
    //                                 </td>
    //                                 <th
    //                                     scope="row"
    //                                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                                 >
    //                                     Magic Keyboard
    //                                 </th>
    //                                 <td className="px-6 py-4">Black</td>
    //                                 <td className="px-6 py-4">Accessories</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">$99</td>
    //                                 <td className="px-6 py-4">453 g</td>
    //                                 <td className="flex items-center px-6 py-4">
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //                                     >
    //                                         Edit
    //                                     </a>
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
    //                                     >
    //                                         Remove
    //                                     </a>
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //                                 <td className="w-4 p-4">
    //                                     <div className="flex items-center">
    //                                         <input
    //                                             id="checkbox-table-search-3"
    //                                             type="checkbox"
    //                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                                         />
    //                                         <label
    //                                             htmlFor="checkbox-table-search-3"
    //                                             className="sr-only"
    //                                         >
    //                                             checkbox
    //                                         </label>
    //                                     </div>
    //                                 </td>
    //                                 <th
    //                                     scope="row"
    //                                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                                 >
    //                                     Apple TV 4K
    //                                 </th>
    //                                 <td className="px-6 py-4">Black</td>
    //                                 <td className="px-6 py-4">TV</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">No</td>
    //                                 <td className="px-6 py-4">$179</td>
    //                                 <td className="px-6 py-4">1.78 lb.</td>
    //                                 <td className="flex items-center px-6 py-4">
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //                                     >
    //                                         Edit
    //                                     </a>
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
    //                                     >
    //                                         Remove
    //                                     </a>
    //                                 </td>
    //                             </tr>
    //                             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //                                 <td className="w-4 p-4">
    //                                     <div className="flex items-center">
    //                                         <input
    //                                             id="checkbox-table-search-3"
    //                                             type="checkbox"
    //                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                                         />
    //                                         <label
    //                                             htmlFor="checkbox-table-search-3"
    //                                             className="sr-only"
    //                                         >
    //                                             checkbox
    //                                         </label>
    //                                     </div>
    //                                 </td>
    //                                 <th
    //                                     scope="row"
    //                                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                                 >
    //                                     AirTag
    //                                 </th>
    //                                 <td className="px-6 py-4">Silver</td>
    //                                 <td className="px-6 py-4">Accessories</td>
    //                                 <td className="px-6 py-4">Yes</td>
    //                                 <td className="px-6 py-4">No</td>
    //                                 <td className="px-6 py-4">$29</td>
    //                                 <td className="px-6 py-4">53 g</td>
    //                                 <td className="flex items-center px-6 py-4">
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //                                     >
    //                                         Edit
    //                                     </a>
    //                                     <a
    //                                         href="#"
    //                                         className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
    //                                     >
    //                                         Remove
    //                                     </a>
    //                                 </td>
    //                             </tr>
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             </main>
    //         </div>
    //     </div>
    // );

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
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="overflow-hidden rounded-full"
                                >
                                    User
                                </Button>
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
