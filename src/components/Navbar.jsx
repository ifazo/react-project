import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { getCurrentUser, signOut } from "../lib/firebase";
import BagModal from "./BagModal";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [user, setUser] = useState(null);
  const products = useSelector((state) => state.products.products);
  
  // Use useLocation to get the current route
  const location = useLocation();
  
  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      console.log(user);
    });
  }, []);


  return (
    <>
      <BagModal open={isBagOpen} setOpen={setIsBagOpen} products={products} name={user?.displayName} email={user?.email} />

      <Disclosure as="nav" className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
              <div className="flex flex-shrink-0 items-center">
                <img alt="" src="/logo.png" className="h-8 w-auto" />
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {/* Update active class dynamically */}
                <Link
                  to="/"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    location.pathname === "/"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    location.pathname.startsWith("/products") // Check if the current path starts with /products
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Products
                </Link>
                <Link
                  to="/categories"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    location.pathname.startsWith("/categories") // Check if the current path starts with /categories
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Categories
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex flex-shrink-0 items-center gap-4">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={user.photoURL}
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full text-left"
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                  {/* Notification button */}
                  <button
                    type="button"
                    onClick={() => setIsBagOpen(true)}
                    className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <ShoppingBagIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <div className="flex-shrink-0">
                  <Link
                    to="/sign-in"
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <UserIcon aria-hidden="true" className="-ml-0.5 h-5 w-5" />
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 pb-3 pt-2">
            <DisclosureButton
              as="a"
              href="/"
              className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 ${
                location.pathname === "/"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              Home
            </DisclosureButton>
            <DisclosureButton
              as="a"
              href="/products"
              className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 ${
                location.pathname.startsWith("/products") // Check if the current path starts with /products
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              Products
            </DisclosureButton>
            <DisclosureButton
              as="a"
              href="/categories"
              className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6 ${
                location.pathname.startsWith("/categories") // Check if the current path starts with /categories
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              Categories
            </DisclosureButton>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
}
