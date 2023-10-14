import Link from "next/link"

export const LoginButton = () => {
    return (
        <Link href={"/login"}><button type="button" className='bg-blue-900 text-white p-2 rounded-md hover:bg-blue-600'>Login</button></Link>
    )
}