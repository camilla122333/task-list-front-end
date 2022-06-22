import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import tasksJson from './data/tasks.json';
import axios from 'axios';

export const URL = 'http://task-and-goal-list-api.herokuapp.com/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setTasks(() => {
          return response.data.map((task) => {
            return {
              description: task.description,
              goalId: task.goal_id,
              id: task.id,
              isComplete: task.is_complete,
              title: task.title
            };
          });
        });
        // const newTasks = response.data.map((task) => {
        //   return {
        //     description: task.description,
        //     goalId: task.goal_id,
        //     id: task.id,
        //     isComplete: task.is_complete,
        //     title: task.title
        //   };
        // });
        setStatus('Loaded');
        console.log(status);
        // setTasks(newTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateTask = id => {
    // create a new list of task data in which the clicked task has its
    // completion toggled. This approach is _slightly_ unsafe in asynchronous
    // code, and we may prefer the functional style of setting tasks, which
    // has the latest state, even if a render hasn't yet happened (see below).

    // const newTasks = tasks.map(task => {
    //   if (task.id === id) {
    //     return { ...task, isComplete: !task.isComplete };
    //   } else {
    //     return task;
    //   }
    // });

    // setTasks(newTasks);
    let endpoint;
    for (const task of tasks){
      if (task.id === id){
        endpoint = !task.isComplete ? `/${id}/mark_complete`: `/${id}/mark_incomplete`;
      }
    }
    axios
    .patch(URL + endpoint)
    .then((response) => {
      console.log(response);
      // Alternative functional style set state call
      setTasks(oldTasks => {
        // the logic is identical as above, but instead, we return the new value
        // to be used for the state, and the input parameter will be the current
        // state with any pending changes applied, even if the next render hasn't
        // yet occurred.
  
        return oldTasks.map(task => {
          if (task.id === id) {
            return { ...task, isComplete: !task.isComplete };
          } else {
            return task;
          }
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const deleteTask = id => {
    // create a new list of task data in which the clicked task is removed
    // from the list. The function given to .filter should return true if that
    // entry in the list should be kept, and false if it should be excluded. We
    // want to keep the tasks that _weren't_ clicked, so we return true for the
    // tasks whose id don't match the clicked task id. As with toggling the
    // completion, this approach is slightly unsafe for asynchronous code, so
    // might prefer the functional set state style (see below).

    // const newTasks = tasks.filter(task => task.id !== id);

    // setTasks(newTasks);
    let endpoint = `/${id}`;
    axios
    .delete(URL + endpoint)
    .then((response) => {
      console.log(response);
      // Alternative functional style set state call
      setTasks(oldTasks => {
      // the logic is identical as above, but instead, we return the new value
      // to be used for the state, and the input parameter will be the current
      // state with any pending changes applied, even if the next render hasn't
      // yet occurred.
      return oldTasks.filter(task => task.id !== id);
    });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            onToggleCompleteCallback={updateTask}
            onDeleteCallback={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
