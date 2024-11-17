import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { Toaster } from "react-hot-toast";

// import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
// import 'primereact/resources/primereact.min.css'; //core css
// import 'primeicons/primeicons.css'; //icons
// import 'primeflex/primeflex.css'; // flex

export default function App() {

  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  );
}
