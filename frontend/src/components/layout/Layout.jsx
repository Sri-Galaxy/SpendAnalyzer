import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />

      <main className="ml-56 pt-16 p-8">
        {children}
      </main>
    </div>
  );
}