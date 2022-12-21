import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { NavBar } from "./NavBar/NavBar";
// import { Footer } from "./Footer/Footer";

const Login = React.lazy(() => import("./Login/Login"));
const Activities = React.lazy(() => import("./Activities/Activities"));
const Register = React.lazy(() => import("./Register/Register"));
const Courses = React.lazy(() => import("./Courses/Courses"));
const Library = React.lazy(() => import("./Library/Library"));
const Apply = React.lazy(() => import("./Apply/Apply"));
const EditAddCourse = React.lazy(() => import("./EditAddCourse/EditAddCourse"));
const EditAddBook = React.lazy(() => import("./EditAddBook/EditAddBook"));
const AdminDashboard = React.lazy(() =>
  import("./AdminDashboard/AdminDashboard")
);
const CourseDetail = React.lazy(() => import("./CourseDetail/CourseDetail"));
const BookDetail = React.lazy(() => import("./LibraryDetail/LibraryDetail"));
const Home = React.lazy(() => import("./Home/Home"));
console.log(Home);
const App = () => {
  return (
    <div style={{ minHeight: "67vh" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/activities" component={Activities} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/library" component={Library} />
          <Route exact path="/apply" component={Apply} />
          <Route exact path="/addCourse" component={EditAddCourse} />
          <Route exact path="/editCourse" component={EditAddCourse} />
          <Route exact path="/addBook" component={EditAddBook} />
          <Route exact path="/editBook" component={EditAddBook} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/course/:id" component={CourseDetail} />
          <Route exact path="/book/:id" component={BookDetail} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
