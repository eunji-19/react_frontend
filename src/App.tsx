import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetail from "./pages/BookDetail";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Profile from "./pages/Profile";
import Book from "./pages/Book";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Book />} />
          <Route path="/recommend" element={<Book />} />
          <Route path="/new" element={<Book />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
