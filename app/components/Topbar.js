'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Topbar() {
   const pathname = usePathname()
   const router = useRouter()
   
   const handleLogout = () => {
    localStorage.removeItem("jwt_token")
    router.push('/login')
   }

   return (
    <>
      <div className="container mx-auto fixed top-0 left-0 right-0">
        <div className='flex justify-around items-center w-full h-full bg-blue-500'>
            <Link href='/'><div className="text-xl py-3 font-bold text-white ml-3">E-Commerce Admin App</div></Link>
            <div className="flex items-center justify-center">
                <div className="text-white text-medium mr-5 hover:text-black"><Link className={pathname === '/products' ? 'font-bold text-gray-800' : ''} href="/products">Products</Link></div>
                <div className="text-white text-medium mr-5 hover:text-black"><Link className={pathname === '/admin-customers' ? 'font-bold text-gray-800' : ''} href="/admin-customers">Admin-Customers</Link></div>
                <div className="text-white text-medium mr-5 hover:text-black"><Link className={pathname === '/admin-orders' ? 'font-bold text-gray-800' : ''} href="/admin-orders">Admin-Orders</Link></div>
                <div className="text-white text-medium mr-5 hover:text-black"><Link className={pathname === '/admin-products' ? 'font-bold text-gray-800' : ''} href="/admin-products">Admin-Products</Link></div>
                
            </div>
            <div>
                <button onClick={handleLogout} className="w-10/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Logout</button>
            </div>
        </div>
      </div>
      
    </>
  );
}