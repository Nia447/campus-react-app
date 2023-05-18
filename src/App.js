import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/homePage/home";
import RegistrationContainer from "./components/registrationPage/registrationContainer";
import NavbarContainer from "./components/navbar/navbarContainer";
import LoginContainer from "./components/loginPage/loginContainer";
import ProfileContainer from "./components/profilePage/profileContainer";
import GroupsContainer from "./components/groupsPage/groupsContainer";
import GroupContainer from "./components/groupPage/groupContainer";
import MyCoursesContainer from "./components/coursesPage/myCoursesContainer";
import TeachingCoursesContainer from "./components/coursesPage/teachingCoursesContainer";
import CourseContainer from "./components/coursePage/courseContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavbarContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<RegistrationContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/profile" element={<ProfileContainer />} />
          <Route path="/groups" element={<GroupsContainer />} />
          <Route path="/groups/:id" element={<GroupContainer />} />
          <Route path="/courses/my" element={<MyCoursesContainer />} />
          <Route
            path="/courses/teaching"
            element={<TeachingCoursesContainer />}
          />
          <Route path="/courses/:id" element={<CourseContainer />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
