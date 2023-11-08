import { useReducer, useState } from 'react';
import './App.css';
import Task from './Task';

const initialState = {
  tasks: [
    { id: 1, title: 'Limpiar zapatos', done: false },
    { id: 2, title: 'Limpiar ventanas', done: false },
    { id: 3, title: 'Barrer la tienda', done: false },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              title: action.payload.title,
            };
          }

          return task;
        }),
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { tasks } = state;

  const [task, setTask] = useState('');

  const addTask = task => {
    if (task === '') {
      alert('Task is empty');
      return;
    }

    if (tasks.find(t => t.title === task)) {
      alert('Already exists');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: task,
      done: false,
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    setTask('');
  };

  const removeTask = id => {
    dispatch({ type: 'REMOVE_TASK', payload: id });
  };

  const editTask = (id, title) => {
    dispatch({ type: 'EDIT_TASK', payload: { id, title } });
  };

  return (
    <div>
      <h1>Todo</h1>
      <div>
        <input
          type='text'
          placeholder='New task'
          onKeyDown={event => {
            if (event.key === 'Enter') {
              addTask(event.target.value);
              event.target.value = '';
            }
          }}
          value={task}
          onChange={event => {
            setTask(event.target.value);
          }}
        />
        <button onClick={() => addTask(task)}>+</button>
      </div>

      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          removeTask={removeTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default App;
