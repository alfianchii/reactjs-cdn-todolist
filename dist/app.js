const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
function App() {
  const [activity, setActivity] = React.useState("");
  const [edit, setEdit] = React.useState({});
  const [todos, setTodos] = React.useState([]);
  function generateId() {
    return Date.now();
  }
  function saveTodoHandler(event) {
    event.preventDefault();

    // If edit mode
    if (edit.id) {
      // Updated todo
      const updatedTodo = {
        id: edit.id,
        activity
      };

      // Filter
      const editTodoIndex = todos.findIndex(todo => todo.id === edit.id);

      // Set
      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      return setTodos(updatedTodos);
    }
    setTodos([...todos, {
      id: generateId(),
      activity
    }]);
    setActivity("");
  }
  function removeTodoHandler(todoId) {
    const filteredTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(filteredTodos);
  }
  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Simple Todo List"), /*#__PURE__*/React.createElement("form", {
    onSubmit: saveTodoHandler
  }, /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    type: "text",
    placeholder: "Nama aktifitas ...",
    value: activity,
    onChange: event => setActivity(event.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, edit.id ? "Simpan" : "Tambah")), /*#__PURE__*/React.createElement("ul", null, todos.map(todo => /*#__PURE__*/React.createElement("li", {
    key: todo.id
  }, todo.activity, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    onClick: editTodoHandler.bind(this, todo)
  }, "Edit"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    onClick: removeTodoHandler.bind(this, todo.id)
  }, "Hapus")))));
}
root.render( /*#__PURE__*/React.createElement(App, null));