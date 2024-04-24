import { NavLink } from "react-router-dom";
import { useShoppingCartContext } from "../../context";

let menuLeft = [
    {
        to: '/',
        text: 'All',
        className: ''
    },
    {
        to: '/clothes',
        text: 'clothes',
        className: ''
    },
    {
        to: '/electronics',
        text: 'electronics',
        className: ''
    },
    {
        to: '/furnitures',
        text: 'furnitures',
        className: ''
    },
    {
        to: '/toys',
        text: 'toys',
        className: ''
    },
    {
        to: '/others',
        text: 'others',
        className: ''
    },
]

let menuRight = [
    {
        to: '/email',
        text: 'juanmer382@gmail.com',
        className: 'text-black/60'
    },
    {
        to: '/my-orders',
        text: 'My orders',
        className: ''
    },
    {
        to: '/my-account',
        text: 'My occount',
        className: ''
    },
    {
        to: '/sign-in',
        text: 'Sign in',
        className: ''
    },
]

const Navbar = () => {
    const {cartProducts} = useShoppingCartContext();
    const activeStyle = 'underline underline-offset-4';
    const {setSearchByCategory} = useShoppingCartContext();

    return (
        <nav className="flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light bg-white">
            <ul className="flex items-center gap-3">
                <li 
                className={"font-semibold text-lg"}
                >
                    <NavLink 
                    to={"/"}
                    >
                        {"Shopi"}
                    </NavLink>
                </li>
                {menuLeft.map(link => (
                    <li 
                    key={link.text}
                    className={link.className}
                    >
                        <NavLink 
                            to={link.to}
                            className={({isActive})=> isActive ? activeStyle : undefined }
                            onClick={() => {
                                if(link.text === "All") setSearchByCategory("");
                                else setSearchByCategory(link.text);
                            }}
                        >
                            {link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <ul className="flex items-center gap-3">
                {menuRight.map(link => (
                    <li 
                        key={link.text}
                        className={link.className}
                    >
                        <NavLink 
                            to={link.to}
                            className={({isActive})=> isActive ? activeStyle : undefined }
                        >
                            {link.text}
                        </NavLink>
                    </li>
                ))}
                    <li 
                    className="flex items-center gap-1 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <NavLink 
                        to={""}
                            className={({isActive})=> isActive ? activeStyle : undefined }
                        >
                            {cartProducts.length}
                        </NavLink>
                    </li>
            </ul>
        </nav>
    );
}

// const Navbar = () => {
//     const activeStyle = 'underline underline-offset-4'

//     return (
//         <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light">
//             <ul className="flex items-center gap-3">
//                 <li className="font-semibold text-lg">
//                     <NavLink 
//                     to="/" 
//                     >
//                         Shopi
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink 
//                     to="/"
//                     className={({isActive}) => isActive ? activeStyle : undefined}
//                     >
//                         All
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink 
//                     to="/clothes"
//                     className={({isActive}) => isActive ? activeStyle : undefined}
//                     >
//                         Clothes
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink 
//                     to="/electronics"
//                     className={({isActive}) => isActive ? activeStyle : undefined}
//                     >
//                         Electronics
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink 
//                     to="/furnitures"
//                     className={({isActive}) => isActive ? activeStyle : undefined}
//                     >
//                         Furnitures
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink 
//                     to="/toys"
//                     className={({isActive}) => isActive ? activeStyle : undefined}
//                     >
//                         Toys
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink 
//                     to="/others"
//                     className={({isActive}) => isActive ? activeStyle : undefined}
//                     >
//                         Others
//                     </NavLink>
//                 </li>
//             </ul>
//             <ul className="flex items-center gap-3">
//                 <li className="text-black/60">
//                     adriansotohidalgo@gmail.com
//                 </li>
//                 <li>
//                     <NavLink 
//                     to="/my-orders"
//                     className={({isActive}) => isActive ? activeStyle : undefined}>
//                         My Orders
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink 
//                     to="/my-account"
//                     className={({isActive}) => isActive ? activeStyle : undefined}>
//                         My Account
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink 
//                     to="/sign-in"
//                     className={({isActive}) => isActive ? activeStyle : undefined}>
//                         Sign In
//                     </NavLink>
//                 </li>
//                 <li>
//                     0
//                 </li>
//             </ul>
//         </nav>
//     );
// }

export default Navbar;