import { useState } from 'react';
import './App.css';

import NavBar from './components/Navbar/NavBar';
import History from './components/Historypage/History';
import MyAcc from './components/mePage/MyAcc';
import Workout from './components/WorkoutPage/Workout';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AboutUs from './components/AboutUsPage/AboutUs';
import Articles from './components/ArticlesPage/Articles';
import BodyWorkout from './components/WorkoutPage/BodyWorkoutPage/BodyWorkout';
import ShowBodyExe from './components/WorkoutPage/BodyWorkoutPage/Showbodyexercise/ShowBodyExe';
import BodyWorkoutSP from './components/WorkoutPage/BodyWorkoutPage/BodyWorkoutSP';
import OptBottom from './components/Navbar/components/OptBottom';
import { FaDumbbell } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import WorkoutLevelPage from './components/WorkoutPage/WorkoutLevelPage';
import WorkoutFinish from './components/WorkoutPage/WorkoutFinish';
import ShowArticle from './components/ArticlesPage/ShowArticle';
import CustomTraining from './components/mePage/CustomTraining';

function App() {
  const [toggle, setToggle] = useState("light");
  const options = [{name: "WORKOUTS",link:"/",logo:<FaDumbbell/>},{name:"ARTICLES",link:"/articles",logo:<FaBookOpen />},{name:"ABOUT",link:"/aboutus",logo:<MdPeople />},{name:"HISTORY",link:"/history",logo:<FiMoreHorizontal />}];
const[removeWorkout,setRemoveWorkout]=useState([]);


  const router = createBrowserRouter([
    {
      path: "/me",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <MyAcc toggle={toggle} />
          <OptBottom options={options} />
        </>
      ),
    },
    {
      path: "/me/CustomTraining",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <CustomTraining toggle={toggle}></CustomTraining>
          <OptBottom options={options} />
        </>
      ),
    },
    {
      path: "/history",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <History toggle={toggle} />
          <OptBottom options={options} />
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <Workout />
          <OptBottom options={options} />
        </>
      ),
    },
    {
      path: "/workout/workoutlevel",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <WorkoutLevelPage />
          <OptBottom options={options} />
        </>
      ),
    },
    {
      path: "/workout/workoutlevel/:id/bodyworkout",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <BodyWorkout removeWorkout={removeWorkout}  />
          <OptBottom options={options} />
        </>
      ),
    },
    {
      path: "/workout/workoutlevel/:id/bodyworkout/showbodyexe/:bodymuscle",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <ShowBodyExe  removeWorkout={removeWorkout}  setRemoveWorkout={setRemoveWorkout}  />
          <OptBottom options={options} />
        </>
      ),
    },
    {
      path: "/workout/workoutlevel/:id/bodyworkout/showbodyexe/:exercisename/:bodymuscle/SP",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <BodyWorkoutSP />
          <OptBottom options={options} />
        </>
      ),
    },
    {
      path: "/workout/workoutlevel/:id/bodyworkout/showbodyexe/:exercisename/:bodymuscle/SP/Workoutfinish",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <WorkoutFinish />
          <OptBottom options={options} />
        </>
      ),
    },
    {
      path: "/aboutus",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <AboutUs />
          <OptBottom options={options} />
        </>
      ),
    },
    {
      path: "/articles",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <Articles />
          <OptBottom options={options} />
        </>
      ),
    },
    {
      path: "/articles/showarticle/:articlename",
      element: (
        <>
          <NavBar toggle={toggle} options={options} />
          <ShowArticle></ShowArticle>
          <OptBottom options={options} />
        </>
      ),
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AACC00] to-[#87B193] flex flex-col justify-between lg:justify-normal">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
