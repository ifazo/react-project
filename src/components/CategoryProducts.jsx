import { Link } from "react-router-dom";

export default function CategoryProducts({products}) {

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-lg font-medium text-gray-900">
            All products in the category
          </h2>
          <Link
            to="/categories"
            className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  alt='img'
                  src={product.thumbnail}
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                >
                  <div className="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                    View Product
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                <h3>
                  <Link to={`/products/${product._id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                  </Link>
                </h3>
                <p>${product.price}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
