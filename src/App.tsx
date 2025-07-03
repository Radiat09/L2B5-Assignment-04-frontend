import { Outlet } from "react-router";
import Navbar from "./layout/Navbar";
import Banner from "./layout/Banner";
import Footer from "./layout/Footer";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Banner />
        <Navbar />
        <main className="flex-grow min-h-screen">
          <Outlet />
        </main>
        <Footer />
        <Toaster position="top-right" richColors duration={3000} />
      </div>
    </>
  );
}

export default App;
