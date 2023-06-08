import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface Task {
  _id: string;
  question: string;
  answer: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchTasksFromAPI();
  }, []);

  const fetchTasksFromAPI = () => {
    axios.get<Task[]>('/api/tasks')
      .then((response: AxiosResponse<Task[]>) => {
        setTasks(response.data);
        initializeUserAnswerState(response.data);
      })
      .catch((error: AxiosError) => console.error(error));
  };

  const initializeUserAnswerState = (tasks: Task[]) => {
    const initialUserAnswers: Record<string, string> = {};
    tasks.forEach((task: Task) => {
      initialUserAnswers[task._id] = '';
    });
    setUserAnswers(initialUserAnswers);
  };

  const handleInputChange = (taskId: string, event: ChangeEvent<HTMLInputElement>) => {
    const enteredValue: string = event.target.value;
    updateUserAnswerState(taskId, enteredValue);
  };

  const updateUserAnswerState = (taskId: string, value: string) => {
    setUserAnswers((prevUserAnswers: Record<string, string>) => ({
      ...prevUserAnswers,
      [taskId]: value,
    }));
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task._id}>
            {task.question.split('_______').map((part: string, index: number) => (
              <React.Fragment key={index}>
                {part}
                {index !== task.question.split('_______').length - 1 && (
                  <input
                    type="text"
                    value={userAnswers[task._id]}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(task._id, event)}
                  />
                )}
              </React.Fragment>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
