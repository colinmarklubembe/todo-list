const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db_config");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo ORDER BY todo_id ASC"
    );
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json(updateTodo.rows[0]);
    // res.json("Todo was updated!");
  } catch (err) {
    console.log(err.message);
  }
});

// Toggle the status of done for a todo
app.put("/todos/toggle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the current done status
    const currentTodo = await pool.query(
      "SELECT done FROM todo WHERE todo_id = $1",
      [id]
    );
    const currentStatus = currentTodo.rows[0].done;

    // Toggle the status
    const newStatus = !currentStatus;

    // Update the todo with the new status
    const updateDoneStatus = await pool.query(
      "UPDATE todo SET done = $1 WHERE todo_id = $2",
      [newStatus, id]
    );

    // res.json(`Done status for todo ${id} was toggled to ${newStatus}`);
    res.json(updateDoneStatus.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    // res.json("Todo was deleted!");
    res.json(deleteTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
