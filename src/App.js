import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Activities,
  Courses,
  Apply,
  Login,
  NavBar,
  Register,
  Footer,
  Library,
  EditAddCourse,
  EditAddBook,
  CourseDetail,
  BookDetail,
  Home,
} from "./Exporter/Exporter";
import { AdminDashboard } from "./AdminDashboard/AdminDashboard";

const App = () => {
  return (
    <div>
      <NavBar />
      <div style={{ minHeight: "67vh" }}>
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
      </div>
      <Footer />
    </div>
  );
};

export default App;
