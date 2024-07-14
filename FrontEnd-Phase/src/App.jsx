import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./pages/Signup/SignUp";
import HomePage from "./pages/home_page/main_page";
import PageNotFound from "./pages/PageNotFound";
import SignInSide from "./pages/Login/LogIn";
import ProductPage from "./pages/ProductPage/product_page";
import HelpPage from "./pages/HelpPage/HelpPage";
import HotAuctionsPage from "./pages/hot_auctions_page/hot_auctions_page";
import CategoriesPage from "./pages/categories_page/categories_page";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Email_after_bid from "./pages/email_after_bid/email_after_bid";
import Search_page from "./pages/search_page/search_page";
import "./Fonts/IRANSansWeb.ttf";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthService";
export const IP = "http://127.0.0.1:8000";
// export const IP = "http://192.168.95.39:8000";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<SignInSide />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="product/:id" element={<ProductPage />} />
        <Route
          path="profile/:activeTab"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="help/:number" element={<HelpPage />} />
        <Route path="hot_auctions" element={<HotAuctionsPage />} />
        <Route path="categories/:id" element={<CategoriesPage />} />
        <Route path="email" element={<Email_after_bid />} />
        <Route path="search/:searched" element={<Search_page />} />
      </Routes>
    </AuthProvider>
  );
}
function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
