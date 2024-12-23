import Footer from "./components/componentUI/Footer";
import Header from "./components/componentUI/Header"
import Courses from "./pages/courses"
import Home from "./pages/home"
import Quiz from "./pages/Quiz"
import {BrowserRouter, Routes,Route, } from 'react-router-dom'
import Result from "./pages/Result";
import Login from "./pages/Login";
import RegisternForm from "./pages/register";


function App({banner}: {banner: string}) {

 
  const footerLinks = [
    { label: "Home", path: "/" },
    { label: "Quiz", path : "/quiz"  },
    { label: "Resultats", path :"/results"  },
    { label: "Profile", path : "/profil"  },
    { label: "A propos", path : "/about" },
  ];
  return (
    <BrowserRouter>
    <Header banner={banner} /> 
    <Routes>
 <Route path="/" element={<Home/>} />
<Route path="/courses" element={<Courses isOpen={false} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } title={""} body={""} onEasyPress={function (): void {
          throw new Error("Function not implemented.");
        } } onDifficultPress={function (): void {
          throw new Error("Function not implemented.");
        } }/>} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/results" element={<Result/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisternForm/>} />
        </Routes>
        <Footer links={footerLinks} />
    </BrowserRouter>
  )
}

export default App
