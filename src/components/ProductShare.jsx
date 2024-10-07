import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  InstapaperShareButton,
  TelegramShareButton,
  RedditShareButton,
  LineShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  PinterestIcon,
  InstapaperIcon,
  TelegramIcon,
  RedditIcon,
  LineIcon,
  EmailIcon,
} from "react-share";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductShare({ open, setOpen, product }) {
  const productUrl = window.location.href;
  const shareMessage = `${product.title} - ${product.description} - Only $${product.price}! Check it out: `;

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      alt={product.title}
                      src={product.images[0]}
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                    {product.title}
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-3"
                  >
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="text-2xl text-gray-900">${product.price}</p>

                    {/* Reviews */}
                    <div className="mt-3">
                      <h4 className="sr-only">Reviews</h4>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                product.rating > rating
                                  ? "text-yellow-400"
                                  : "text-gray-200",
                                "h-5 w-5 flex-shrink-0"
                              )}
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {product.rating} out of 5 stars
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="sr-only">Description</h4>

                      <p className="text-sm text-gray-700">
                        {product.description}
                      </p>
                    </div>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-6">
                    <h3 id="options-heading" className="sr-only">
                      Share options
                    </h3>

                    <div>
                      <h4 className="text-sm font-medium text-gray-600">
                        Share this product
                      </h4>

                      <div className="mt-2 flex space-x-3">
                        <FacebookShareButton
                          url={productUrl}
                          quote={shareMessage}
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={productUrl}
                          title={shareMessage}
                        >
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <LinkedinShareButton
                          url={productUrl}
                          title={product.title}
                          summary={product.description}
                        >
                          <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        <WhatsappShareButton
                          url={productUrl}
                          title={shareMessage}
                        >
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <PinterestShareButton
                          url={productUrl}
                          media={product.images[0]}
                          description={shareMessage}
                        >
                          <PinterestIcon size={32} round />
                        </PinterestShareButton>
                        <InstapaperShareButton
                          url={productUrl}
                          title={shareMessage}
                        >
                          <InstapaperIcon size={32} round />
                        </InstapaperShareButton>
                        <TelegramShareButton
                          url={productUrl}
                          title={shareMessage}
                        >
                          <TelegramIcon size={32} round />
                        </TelegramShareButton>
                        <RedditShareButton
                          url={productUrl}
                          title={shareMessage}
                        >
                          <RedditIcon size={32} round />
                        </RedditShareButton>
                        <LineShareButton url={productUrl} title={shareMessage}>
                          <LineIcon size={32} round />
                        </LineShareButton>
                        <EmailShareButton
                          url={productUrl}
                          subject={product.title}
                          body={shareMessage}
                        >
                          <EmailIcon size={32} round />
                        </EmailShareButton>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
