"use client";

import { useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { ShareIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import Reviews from "../components/Reviews";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  });

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <TabGroup className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
                {product.images.map((image, index) => (
                  <Tab
                    key={index}
                    className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    <span className="sr-only">"Image"</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img
                        alt="image"
                        src={image}
                        className="h-full w-full object-cover object-center"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
                    />
                  </Tab>
                ))}
              </TabList>
            </div>

            <TabPanels className="aspect-h-1 aspect-w-1 w-full">
              {product.images.map((image, index) => (
                <TabPanel key={index}>
                  <img
                    alt="image"
                    src={image}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        product.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm font-medium text-gray-600">
                  ({product.rating} out of 5 stars)
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-10 flex">
              <button
                type="submit"
                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
              >
                Add to bag
              </button>

              <button
                type="button"
                className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <ShareIcon
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0"
                />
                <span className="sr-only">Add to favorites</span>
              </button>
            </div>

            {/* Product details */}
            <section aria-labelledby="details-heading" className="mt-12">
              <h2
                id="details-heading"
                className="text-lg font-medium text-gray-900"
              >
                Product Details
              </h2>
              <div className="mt-4 text-base text-gray-700">
                <p>Weight: {product.weight}g</p>
                <p>
                  Dimensions: {product.dimensions.width}cm x{" "}
                  {product.dimensions.height}cm x {product.dimensions.depth}cm
                </p>
                <p>Warranty: {product.warrantyInformation}</p>
                <p>Shipping: {product.shippingInformation}</p>
                <p>Return Policy: {product.returnPolicy}</p>
                <p>Minimum Order Quantity: {product.minimumOrderQuantity}</p>
              </div>
            </section>

            <div className="flex flex-wrap items-center space-x-2 mt-8">
              {product.tags.map((tag) => (
                <p
                  key={tag}
                  className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  #{tag}
                </p>
              ))}
            </div>
          </div>
        </div>
        <Reviews reviews={product.reviews} />
      </div>
    </div>
  );
}
