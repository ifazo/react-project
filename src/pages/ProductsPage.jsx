import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Spinner from "../components/Spinner";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";

const sortOptions = [
  { name: "Price (Low to High)", sortBy: "price", sort: "asc" },
  { name: "Price (High to Low)", sortBy: "price", sort: "desc" },
  { name: "Rating (High to Low)", sortBy: "rating", sort: "desc" },
  { name: "Rating (Low to High)", sortBy: "rating", sort: "asc" },
  { name: "Title (A-Z)", sortBy: "title", sort: "asc" },
  { name: "Title (Z-A)", sortBy: "title", sort: "desc" },
];

const priceFilters = [
  { value: 49, label: "$49 to down" },
  { value: 99, label: "$99 to down" },
  { value: 199, label: "$199 to down" },
  { value: 500, label: "$500 to down" },
];

const ratingFilters = [
  { value: 4, label: "⭐️⭐️⭐️⭐️ & up" },
  { value: 3, label: "⭐️⭐️⭐️ & up" },
  { value: 2, label: "⭐️⭐️ & up" },
  { value: 1, label: "⭐️ & up" },
];

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const limit = 12;

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/products?limit=${limit}&skip=${skip}&price=${price}&rating=${rating}&sortBy=${sortBy}&sort=${sort}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.products);
        setPage(Math.floor(data?.totalProducts / limit) + 1);
        setLoading(false);
      });
  }, [limit, skip, price, rating, sortBy, sort]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bg-gray-50">
      {/* Mobile filter dialog */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 sm:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Price Filter */}
            <form className="mt-4">
              <Disclosure
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                    <span className="font-medium text-gray-900">Price</span>
                    <span className="ml-6 flex items-center">
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-6">
                    {priceFilters.map((option, idx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="price"
                          value={option.value}
                          id={`filter-price-${idx}`}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <label
                          htmlFor={`filter-price-${idx}`}
                          className="ml-3 text-sm text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>

              {/* Rating Filter */}
              <Disclosure
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                    <span className="font-medium text-gray-900">Rating</span>
                    <span className="ml-6 flex items-center">
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-6">
                    {ratingFilters.map((option, idx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={option.value}
                          id={`filter-rating-${idx}`}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={(e) => setRating(e.target.value)}
                        />
                        <label
                          htmlFor={`filter-rating-${idx}`}
                          className="ml-3 text-sm text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Filters */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Products
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
            Products with the best quality and price for you.
          </p>
        </div>

        <section
          aria-labelledby="filter-heading"
          className="border-t border-gray-200 py-6"
        >
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex items-center justify-between">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100"
                        onClick={() => {
                          setSortBy(option.sortBy);
                          setSort(option.sort);
                        }}
                      >
                        {option.name}
                      </button>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            <PopoverGroup className="hidden sm:flex sm:items-baseline sm:space-x-8">
              <Popover
                id="desktop-menu-price"
                className="relative inline-block text-left"
              >
                <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  <span>Price</span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <form className="space-y-4">
                    {priceFilters.map((option, idx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="price"
                          value={option.value}
                          id={`filter-price-desktop-${idx}`}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <label
                          htmlFor={`filter-price-desktop-${idx}`}
                          className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </form>
                </PopoverPanel>
              </Popover>

              <Popover
                id="desktop-menu-rating"
                className="relative inline-block text-left"
              >
                <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  <span>Rating</span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <form className="space-y-4">
                    {ratingFilters.map((option, idx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={option.value}
                          id={`filter-rating-desktop-${idx}`}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={(e) => setRating(e.target.value)}
                        />
                        <label
                          htmlFor={`filter-rating-desktop-${idx}`}
                          className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </form>
                </PopoverPanel>
              </Popover>
            </PopoverGroup>
          </div>
        </section>
      </div>
      <ProductList products={products} />

      <Pagination limit={limit} totalPage={page} skip={skip} setSkip={setSkip} />
    </div>
  );
}
