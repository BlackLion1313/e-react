import { NavLink } from "react-router-dom";
// import ee from "../assets/ee.mp4";

function Home() {
  return (
    <div className="relative min-h-screen bg-gray-900 ">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative flex flex-col items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8 z-10 text-white">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-5xl font-bold mb-8">Welcome to the React Learning Hub</h1>
          <p className="text-xl mb-8">
            Start your journey to become a React developer today! React is a powerful JavaScript library for building
            user interfaces. Whether you're new to React or want to enhance your skills, we've got you covered.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <NavLink
              to="/exercises"
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Explore Exercises
            </NavLink>
            <a
              href="https://reactjs.org/docs/getting-started.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Official Documentation
            </a>
            <a
              href="https://www.tutorialspoint.com/reactjs/index.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              TutorialsPoint
            </a>
            <a
              href="https://www.youtube.com/playlist?list=PLC3y8-rFHvwhAh1ypBvcZLDO6I7QTY5CM"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              React Tutorial Playlist
            </a>
          </div>
          <p className="text-lg mt-8">
            Ready to dive deeper? Check out these resources to accelerate your learning journey:
          </p>
          <ul className="text-left mt-4">
            <li>
              <strong>React Crash Course:</strong> A beginner-friendly crash course by Traversy Media to get started
              with React. Watch the video on{" "}
              <a
                href="https://www.youtube.com/watch?v=w7ejDZ8SWv8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 underline hover:text-blue-600"
              >
                YouTube
              </a>
              .
            </li>
            <li>
              <strong>React Docs:</strong> Dive into the official React documentation to learn about components, hooks,
              and more. Explore the documentation on{" "}
              <a
                href="https://reactjs.org/docs/getting-started.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-600"
              >
                reactjs.org
              </a>
              .
            </li>
            <li>
              <strong>React Tutorial:</strong> Follow the step-by-step tutorial on{" "}
              <a
                href="https://www.tutorialspoint.com/reactjs/index.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-600"
              >
                tutorialspoint.com
              </a>{" "}
              to learn the basics of React.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
