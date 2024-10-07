import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { Toaster } from "react-hot-toast";

export default function App() {

  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  );
}
