import { Link } from "react-router-dom";
import { CoolModeDemo } from "./CoolMode";
import { Marquee3D } from "./MarqueeImg";

export default function Hero() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-12 pt-6 sm:pb-16 lg:col-span-7 lg:px-0 lg:pb-24 lg:pt-20 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="flex items-center">
              <img
                alt=""
                src="/logo.png"
                className="h-11"
              />
              <span className="ml-2 text-2xl font-bold text-gray-900">SHOP</span> {/* Added "Mart" */}
            </div>
            <div className="hidden sm:mt-16 sm:flex lg:mt-8">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Welcome to our online shop {"   "}
                <Link to="/sign-up" className="whitespace-nowrap font-semibold text-indigo-600">
                  <span aria-hidden="true" className="absolute inset-0" />
                  sign up <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <h1 className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:mt-6 sm:text-5xl">
              Online shop for all your needs
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Every product is designed to be the best in its category. We are committed to providing the best products for our customers.
            </p>
            <div className="mt-6 flex items-center gap-x-6">
              <CoolModeDemo />
              <Link to="/sign-in" className="text-sm font-semibold leading-6 text-gray-900">
                Get started <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <Marquee3D />
        </div>
      </div>
    </div>
  );
}
