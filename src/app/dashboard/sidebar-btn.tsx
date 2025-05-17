import Link from "next/link";

type SidebarBtnProps = {
    link: string,
    text: string,
}

export function SidebarBtn ( { link, text }: SidebarBtnProps ) {
    return <Link href={ link } className="hover:bg-[#2F7B4F] text-[#276B45] hover:text-white font-semibold py-2 px-4 rounded-lg hover:shadow">
        { text }
    </Link>
}