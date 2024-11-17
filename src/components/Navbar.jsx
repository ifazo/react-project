import { useEffect, useRef, useState } from "react";
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
  ShoppingCartIcon,
  SunIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import { signOut } from "../lib/firebase";
import CartModal from "./CartModal";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/store/features/userSlice";
import { Toast } from "primereact/toast";

export default function Navbar() {
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Sign out successfully",
      life: 3000,
    });
  };

  const showError = (error) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: error.message,
      life: 3000,
    });
  };

  const navigate = useNavigate();
  const [isBagOpen, setIsBagOpen] = useState(false);

  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);

  const location = useLocation();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut()
      .then(() => {
        dispatch(removeUser());
        showSuccess();
        navigate("/sign-in");
      })
      .catch((error) => {
        showError(error);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <CartModal
        open={isBagOpen}
        setOpen={setIsBagOpen}
        products={products}
        name={user?.displayName}
        email={user?.email}
      />

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
              <div className="flex flex-shrink-0 items-center gap-4">
                {/* View Cart */}
                <button
                  type="button"
                  onClick={() => setIsBagOpen(true)}
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View Cart</span>
                  <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                  {/* Cart Count Badge */}
                  {products.length > 0 ? (
                    <span
                      className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-600 text-white text-xs font-bold"
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      {products.length}
                    </span>
                  ) : (
                    <span
                      className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-600 text-white text-xs font-bold"
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      0
                    </span>
                  )}
                </button>
                {user ? (
                  <>
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
                            to="/dashboard/profile"
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
                  </>
                ) : (
                  <>
                    <Link
                      to="/sign-in"
                      class="rounded-md border border-transparent py-2 px-4 flex items-center text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      Sign in
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-4 h-4 ml-1.5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </>
                )}
              </div>
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
