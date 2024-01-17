import React, { useEffect, useState } from "react";
import styles from "./Todo.module.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const Todo = () => {
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [condition, setCondition] = useState(true);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!condition && value !== null) {
      const updatedTodos = data.map((item) =>
        item.id === value ? { ...item, task: task } : item
      );
      setData(updatedTodos);
      setCondition(true);
      setTask("");
    } else if (condition === true) {
      if (task.trim() !== "") {
        setData([...data, { task: task, id: Date.now() }]);
        setTask("");
      }
    }
  };

  const deleteTask = (id) => {
    const newData = data.filter((item) => item.id !== id);
    console.log("2222222", id);
    setData(newData);
  };

  const editData = (id) => {
    setCondition(false);
    const newData = data.find((item) => item.id === id);
    setValue(id);
    setTask(newData.task);
  };

  return (
    <div className={styles.main}>
      <div>
        <h1>TODO APP</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.text_box}
            type="text"
            placeholder="Enter Your task"
            value={task}
            onChange={handleChange}
          />
          <button className={styles.btn1} type="submit">
            {condition ? "Add" : "Update"}
          </button>
        </form>
      </div>
      <div className={styles.task}>
        {data.map((ele) => {
          return (
            <div className={styles.content} key={ele.id}>
              <input type="checkbox" className={styles.check} /><div className={styles.task_data}>{ele.task}</div>
              <div>
                <FaRegEdit
                  className={styles.icons}
                  onClick={() => editData(ele.id)}
                />
                <MdDelete
                  style={{ paddingLeft: "5px" }}
                  className={styles.icons}
                  onClick={() => deleteTask(ele.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
