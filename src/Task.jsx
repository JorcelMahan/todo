import PropTypes from 'prop-types';
import { useState } from 'react';

const Task = ({ task, removeTask, editTask }) => {
  const [done, setDone] = useState(task.done);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type='text'
            value={task.title}
            onChange={event => editTask(task.id, event.target.value)}
          />
          <button onClick={toggleEdit}>Save</button>
        </>
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

export default Task;
