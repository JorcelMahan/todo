import PropTypes from 'prop-types';
import { useState } from 'react';
import './App.css';

const Task = ({ task, removeTask, editTask }) => {
  const [done, setDone] = useState(task.done);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      {isEditing ? (
        <p>editing</p>
      ) : (
        <>
          <input
            type='checkbox'
            checked={done}
            onChange={() => setDone(!done)}
          />
          <span
            style={{
              textDecoration: done ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </span>
        </>
      )}

      <button onClick={() => removeTask(task.id)}>X</button>
      <button onClick={toggleEdit}>Edit</button>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  removeTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Limpiar zapatos', done: false },
    { id: 2, title: 'Limpiar ventanas', done: false },
    { id: 3, title: 'Barrer la tienda', done: false },
  ]);

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

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, title) => {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            title,
          };
        }

        return task;
      })
    );
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
