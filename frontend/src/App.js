import React from "react";
import Card from "react-bootstrap/Card";
import "./App.css";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <div className="App">
      <Card className="container mt-5">
        <Card.Header>
          <h1>Colin's Todo List</h1>
        </Card.Header>
        <Card.Body>
          <InputTodo />
          <ListTodo />
        </Card.Body>
        <Card.Footer className="text-muted"> &copy; 2024</Card.Footer>
      </Card>
    </div>
  );
}

export default App;
