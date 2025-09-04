import Link from 'next/link';
import { sidebarLinks } from './data';
import { SidebarBtn } from './sidebar-btn';
import Image from 'next/image';

export function Sidebar() {
    return (
        <aside className="flex flex-col w-64 bg-[#F2EFE6] shadow p-4 lg:block h-screen">
            <Link href="/" className="flex gap-2 items-center mb-4">
                <Image
                    alt=""
                    src="img/terrabyte.png"
                    className="w-8 h-8 object-cover mb-2 rounded"
                />
                <h2 className="text-xl font-bold text-[#2F7B4F]">Terrabyte</h2>
            </Link>

            <div className="flex flex-col flex-1 space-y-2 text-gray-700">
                {sidebarLinks.map((sidebarLink, i) => (
                    <SidebarBtn key={i} link="#" text={sidebarLink} />
                ))}
            </div>
        </aside>
    );
}
