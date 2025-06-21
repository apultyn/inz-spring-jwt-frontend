import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainPage from "./pages/MainPage"
import BookReviewsPage from "./pages/BookReviewsPage"
import LoginPage from "./pages/LoginPage"

function App() {
  return <Router>
    <Routes>
      <Route path="" element={<MainPage/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/book/:bookId" element={<BookReviewsPage/>}/>
    </Routes>
  </Router>
}

export default App
