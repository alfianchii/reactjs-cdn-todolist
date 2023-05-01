const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
function App() {
  const [activity, setActivity] = React.useState("");
  const [edit, setEdit] = React.useState({});
  const [todos, setTodos] = React.useState([]);
  const [message, setMessage] = React.useState("");
  function generateId() {
    return Date.now();
  }
  function saveTodoHandler(event) {
    event.preventDefault();

    // If input activity was empty string
    if (!activity) return setMessage("Activity name should not be empty!");

    // Remove message when todo already added or updated
    setMessage("");

    // If edit mode
    if (edit.id) {
      // Updated todo
      const updatedTodo = {
        ...edit,
        activity
      };

      // Filter
      const editTodoIndex = todos.findIndex(todo => todo.id === edit.id);

      // Set
      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      setTodos(updatedTodos);

      // Remove cancel edit
      return cancelEditHandler();
    }
    setTodos([...todos, {
      id: generateId(),
      activity,
      done: false
    }]);
    setActivity("");
  }
  function removeTodoHandler(todoId) {
    const filteredTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(filteredTodos);

    // Remove cancel edit (edit mode)
    if (edit.id) cancelEditHandler();
  }
  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }
  function cancelEditHandler() {
    setEdit({});
    setActivity("");
  }
  function doneTodoHandler(todo) {
    // Checked toggle todo
    const updatedTodo = {
      ...todo,
      // Replace old 'done'
      done: todo.done ? false : true
    };

    // Filter
    const editTodoIndex = todos.findIndex(currentTodo => currentTodo.id === todo.id);

    // Set
    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;
    setTodos(updatedTodos);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-3"
  }, /*#__PURE__*/React.createElement("h1", null, "Simple Todo-list Application"), /*#__PURE__*/React.createElement("span", {
    className: "mb-3 mt-2 d-inline-block h6 font-monospace font-weight-light text-muted"
  }, "Made with", " ", /*#__PURE__*/React.createElement("svg", {
    fill: "red",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    className: "bi bi-heart-fill",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("path", {
    "fill-rule": "evenodd",
    d: "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
  })), " ", "by", " ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/alfianchii",
    className: "text-decoration-none",
    target: "_blank"
  }, "Alfian"))), message && /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger",
    role: "alert"
  }, message)), /*#__PURE__*/React.createElement("form", {
    className: "mb-3",
    onSubmit: saveTodoHandler
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group mb-3"
  }, /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    type: "text",
    className: "form-control",
    id: "activity-name",
    placeholder: "Activity name ...",
    value: activity,
    onChange: event => setActivity(event.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-primary",
    type: "submit"
  }, edit.id ? "Save" : "Add"), edit.id && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-danger me-2",
    onClick: cancelEditHandler
  }, "Cancel"))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("table", {
    className: "table table-striped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "Activity"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Action"))), /*#__PURE__*/React.createElement("tbody", null, todos.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, todos.map((todo, index) => /*#__PURE__*/React.createElement("tr", {
    key: todo.id
  }, /*#__PURE__*/React.createElement("td", {
    className: "align-middle"
  }, index + 1), /*#__PURE__*/React.createElement("td", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-check-input me-2",
    type: "checkbox",
    checked: todo.done,
    id: todo.id,
    onChange: doneTodoHandler.bind(this, todo)
  }), /*#__PURE__*/React.createElement("label", {
    className: "form-check-label",
    htmlFor: todo.id
  }, todo.activity)), /*#__PURE__*/React.createElement("td", {
    className: "align-middle"
  }, todo.done ? /*#__PURE__*/React.createElement("span", {
    className: "badge text-bg-success"
  }, "Done") : /*#__PURE__*/React.createElement("span", {
    className: "badge text-bg-warning"
  }, "Progress")), /*#__PURE__*/React.createElement("td", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary me-2 mb-2",
    type: "submit",
    onClick: editTodoHandler.bind(this, todo)
  }, "Edit"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger me-2 mb-2",
    type: "submit",
    onClick: removeTodoHandler.bind(this, todo.id)
  }, "Delete"))))) : /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-center mt-3"
  }, "There was no activity."))))));
}
root.render( /*#__PURE__*/React.createElement(App, null));