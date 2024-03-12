import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [, setDoneStatus] = useState(todos.done);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
      console.log(deleteTodo);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleToggle = async (e, todo) => {
    e.preventDefault();
    try {
      const newDoneStatus = !todo.done;
      console.log(newDoneStatus);
      const response = await fetch(
        `http://localhost:4000/todos/toggle/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ doneStatus: newDoneStatus }),
        }
      );
      console.log(response);
      if (response.ok) {
        setDoneStatus(newDoneStatus);
        // window.location = "/";
      } else {
        console.log("Failed to toggle done status!");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:4000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, [todos]);

  return (
    <div>
      <Table responsive hover className="mt-4 text-center">
        <thead>
          <tr>
            <td>Description</td>
            <td>Edit</td>
            <td>Delete</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id} className="table-row">
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      onChange={(e) => handleToggle(e, todo)}
                      checked={todo.done}
                    />
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <ListGroup horizontal className="mt-5">
        {todos.map((todo) => (
          <ListGroup.Item
            key={todo.todo_id}
            className="d-flex justify-content-between"
          >
            {todo.description}
            <div className="d-flex justify-content-between">
              <EditTodo todo={todo} />
              <button
                className="btn btn-outline-danger ml-2"
                onClick={() => deleteTodo(todo.todo_id)}
              >
                Delete
              </button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup> */}
    </div>
  );
};

export default ListTodo;
