import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (description.trim() !== "") {
      try {
        const body = { description };
        const response = await fetch("http://localhost:4000/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        console.log(response);
        setDescription("");
        // window.location = "/";
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert("A description is required before submitting!");
    }
  };

  return (
    <div>
      <form className="d-flex mt-3" onSubmit={handleSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="btn btn-info ml-3">Add</button>
      </form>
    </div>
  );
};

export default InputTodo;
