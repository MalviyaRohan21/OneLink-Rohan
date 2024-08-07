'use client';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChartLine, faFileLines } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname } from "next/navigation";


export default function AppSidebar() {
    const path = usePathname();
    console.log(path);
    return (
        <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-2 text-gray-700">
                        <Link 
                        href={'/account'} 
                        className={
                            "flex gap-4 p-2 "
                            + (path === '/account' ? 'text-blue-500 font-bold' : '')
                          }>
                        <FontAwesomeIcon
                           fixedWidth={true}
                           icon={faFileLines}
                           className={'w-6 h-6'}
                        />
                        <span className="">My Page</span>
                        </Link>
                        <Link 
                        href={'/analytics'} 
                        className={
                            "flex gap-4 p-2 "
                            + (path === '/analytics' ? 'text-blue-500 font-bold' : '')
                          }>
                        <FontAwesomeIcon
                           fixedWidth={true}
                           icon={faChartLine}
                           className={'w-6 h-6'}
                        />
                        <span className="">Analytics</span>
                        </Link>
                        <LogoutButton
                         iconLeft={true}
                         className={'flex gap-4 items-center text-gray-700 p-2'}
                         iconClasses={'w-6 h-6'}
                        />
                        <Link href={'/'} className="flex items-center gap-2 text-xs text-gray-500 border-t pt-4 p-2">
                        <FontAwesomeIcon icon={faArrowLeft} className={'w-3 h-3'} />
                        <span>Back to Home</span>
                        </Link>
        </nav>
    );
}
