import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const stats = [
  { label: "Vacation days left", value: 12 },
  { label: "Sick days left", value: 4 },
  { label: "Personal days left", value: 2 },
];

export default function Profile() {
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <h2 id="profile-overview-title" className="sr-only">
        Profile Overview
      </h2>
      <div className="bg-white p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              {user?.photoURL ? (
                <img
                  alt=""
                  src={user.photoURL}
                  className="mx-auto h-20 w-20 rounded-full"
                />
              ) : (
                <UserCircleIcon className="h-20 w-20 text-gray-300" />
              )}
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600">Welcome back,</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                {user.displayName ? user.displayName : "No Name Provided"}
              </p>
              <p className="text-sm font-medium text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:mt-0">
            <a
              href="#"
              className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Edit profile
            </a>
          </div>
        </div>
      </div>
      {user && (
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="px-6 py-5 text-center text-sm font-medium">
            <span className="text-gray-600">Created at:</span>
            <span className="text-gray-900">
              {new Date(Number(user?.createdAt)).toLocaleDateString("en-US")}
            </span>{" "}
          </div>
          <div className="px-6 py-5 text-center text-sm font-medium">
            <span className="text-gray-600">Last login:</span>
            <span className="text-gray-900">
              {new Date(Number(user?.lastLoginAt)).toLocaleDateString("en-US")}
            </span>{" "}
          </div>
          <div className="px-6 py-5 text-center text-sm font-medium">
            <span className="text-gray-900">{products.length}</span>{" "}
            <span className="text-gray-600">Products in cart</span>
          </div>
        </div>
      )}
    </div>
  );
}
