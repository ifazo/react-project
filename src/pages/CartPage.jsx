import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../lib/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

export default function CartPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
  }, []);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  
  const subTotal = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  ).toFixed(2);

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
    toast.success("Product removed from bag");
  };
  
  const handlePayment = async () => {
    const stripe = await stripePromise;
    if (!user) {
      toast.error("Please login to continue");
      return navigate('/sign-in');
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products, name: user?.displayName, email: user?.email }),
    });

    const session = await response.json();
    
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  if (!products.length) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-500">Your shopping cart is empty.</p>
            <Link to="/" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {products.map((product) => (
                <li key={product._id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img
                      alt='img'
                      src={product.thumbnail}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a href={product._id} className="font-medium text-gray-700 hover:text-gray-800">
                            {product.title}
                          </a>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900">${product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    </div>

                    <div className="mt-4 flex flex-1 items-end justify-between">
                      <p className="flex items-center space-x-2 text-sm text-gray-700">
                        {product.stock ? (
                          <CheckIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-green-500" />
                        ) : (
                          <ClockIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-300" />
                        )}

                        <span>{product.stock ? 'In stock' : `Will ship in 5-7 days`}</span>
                      </p>
                      <div className="ml-4">
                        <button
                         type="button" 
                          onClick={() => {
                            handleRemoveProduct(product)
                            toast.success("Product removed from cart")
                          }}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">${subTotal}</dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={() => {
                  toast.loading("Processing payment...");
                  handlePayment()
                }}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout ${subTotal}
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>
                or{' '}
                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
