// import React, { useState, useEffect, ChangeEvent } from 'react';
// import axios, { AxiosResponse, AxiosError } from 'axios'; 

// interface Task {
//   _id: string; 
//   question: string; 
// }

// const TaskList = () => {
//   const [tasks, setTasks] = useState<Task[]>([]); // State variable to store the tasks
//   const [userAnswers, setUserAnswers] = useState<Record<string, string>>({}); // State variable to store user answers

//   useEffect(() => {
//     fetchTasksFromAPI(); // Fetch tasks from API when the component mounts
//   }, []);

//   const fetchTasksFromAPI = () => {
//     axios.get<Task[]>('/api/tasks') // Make a GET request to fetch tasks from the API
//       .then((response: AxiosResponse<Task[]>) => {
//         setTasks(response.data); // Update the tasks state with the fetched tasks
//         initializeUserAnswerState(response.data); // Initialize the user answer state based on the fetched tasks
//       })
//       .catch((error: AxiosError) => console.error(error)); // Log any errors that occur during the request
//   };

//   const initializeUserAnswerState = (tasks: Task[]) => {
//     const initialUserAnswers: Record<string, string> = {}; //  empty object to store user answers
//     tasks.forEach((task: Task) => {
//       initialUserAnswers[task._id] = ''; // Initialize each task's user answer with an empty string
//     });
//     setUserAnswers(initialUserAnswers); // Set the user answer state with the initial values
//   };

//   const handleInputChange = (taskId: string, event: ChangeEvent<HTMLInputElement>) => {
//     const enteredValue: string = event.target.value; // Get the value entered by the user
//     updateUserAnswerState(taskId, enteredValue); // Update the user answer state for the corresponding task
//   };

//   const updateUserAnswerState = (taskId: string, value: string) => {
//     setUserAnswers((prevUserAnswers: Record<string, string>) => ({
//       ...prevUserAnswers, // Copy the previous user answer state
//       [taskId]: value, // Update the user answer for the specified task
//     }));
//   };

//   return (
//     <div>
//       <h1>Task List</h1>
//       <ul>
//         {tasks.map((task: Task) => (
//           <li key={task._id}>
//             {task.question.split('_______').map((part: string, index: number) => (
//               <React.Fragment key={index}>
//                 {part}
//                 {index !== task.question.split('_______').length - 1 && (
//                   <input
//                     type="text"
//                     value={userAnswers[task._id]} // Bind the user answer value to the input field
//                     onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(task._id, event)} // Call the handleInputChange function when the input value changes
//                   />
//                 )}
//               </React.Fragment>
//             ))}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskList;
