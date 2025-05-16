import Link from "next/link";

export default function Dashboard () {
    return (
        <main className="">
            <h1 className="my-2">Hello</h1>
            <Link href="/" className="p-2 rounded-md bg-red-200 cursor-pointer">Home</Link>
        </main>
    );
}
