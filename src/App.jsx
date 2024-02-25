import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import "./app.scss";

const App = () => {
    const taskRef = useRef();
    const [tasks, setTasks] = useState([]);
    const [taskN, setTaskN] = useState(0);

    const createTask = function (id, text) {
        this.id = id;
        this.text = text;
    };

    const handleOnChangeValue = (val) => {
        taskRef.current = val;
    };

    const handleOnClickSubmit = (e) => {
        e.preventDefault();
        if (taskRef.current && taskRef.current.length >= 20) {
            const newTasks = [...tasks, new createTask(taskN, taskRef.current)];
            setTasks(newTasks);
            setTaskN(taskN + 1);
            taskRef.current = "";
        } else {
            const err = document.getElementById("err");
            err.innerText = "Error: To add a task it must be at least 20 characters.";
            console.log("err");
        }
    };

    const handleOnChangeDelete = (index) => {
        const updatedTaskList = tasks.toSpliced(index, 1);
        setTasks(updatedTaskList);
    };

    const TaskForm = () => {
        return (
            <div className="taskForm bg-dark p-3 pb-1">
                <h2 className="taskForm__title text-light">Task Form</h2>
                <form className="taskForm__form">
                    <div className="d-flex">
                        <input className="taskForm__form__input form-control me-2" type="text" name="task-form" id="task-form" placeholder="Add task" minLength={40} onChange={(e) => handleOnChangeValue(e.target.value)}/>
                        <button className="taskForm__form__btn btn btn-light" onClick={handleOnClickSubmit}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                    <br />
                    <span className="err text-danger" id="err"></span>
                </form>
            </div>
        );
    };

    const TaskList = () => {
        return (
            <div className="taskList bg-dark p-3 pt-0 mt-3">
                <div className="d-flex justify-content-between">
                    <h2 className="taskList__title text-light">Task List</h2>
                    <h3 className="taskList__subtitle text-light">Total Tasks: {tasks.length}</h3>
                </div>
                <ul className="taskList__list list-group">
                    {tasks.map((task, index) => (
                        <li className="taskList__item list-group-item bg-dark text-light d-flex justify-content-between align-items-center" key={index}>
                            <div className="d-flex flex-column">
                                <span className="fw-bold">ID: {task.id}</span>
                                <span>{task.text}</span>
                            </div>
                            <button className="taskList__item__btn btn btn-danger" onClick={() => handleOnChangeDelete(index)}><FontAwesomeIcon icon={faTrash} /></button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="container">
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default App;