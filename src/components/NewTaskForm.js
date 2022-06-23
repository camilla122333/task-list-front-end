import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const NewTaskForm = ({onAddTask}) => {
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    isComplete: false
  });

  const handleChange = (event) => {
    setNewTaskData({...newTaskData, [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask(newTaskData);
    setNewTaskData({
      title: '',
      description: '',
      isComplete: false
    });
  };
  return (<form onSubmit={handleSubmit}>
    <section>
      <h2>Add a Task</h2>
      <div>
        <label htmlFor='title'>Title</label>
        <input name='title' id='title' onChange={handleChange} value={newTaskData.title}/>
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <input name='description' id='description' onChange={handleChange} value={newTaskData.description}/>
      </div>
      <button className='button'>
        Add Task
      </button>
    </section>
  </form>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired
};

export default NewTaskForm;