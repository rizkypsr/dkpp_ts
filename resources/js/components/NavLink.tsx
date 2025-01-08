import { Link, InertiaLinkProps } from '@inertiajs/react';
import { cn } from "@/lib/utils"

export default function SidebarLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
    return (
        // <ul className='border-gray-900 border-2'>
        //     <Link
        //         href={href}
        //         className={cn(
        //             "flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-white text-gray-900",
        //             active && "text-white font-bold"
        //         )}
        //     >
        //         {children}
        //     </Link>
        // </ul>
        <li className={
            cn(
                'border-2 border-black hover:border-white/60 rounded-lg',
                active && "border-white/60"
            )
        }>
            <a
                href={href}
                className={cn(
                    "flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:text-white group",
                    active && "text-white font-bold"
                )}
            >
                {children}
            </a>
        </li>
    );
}