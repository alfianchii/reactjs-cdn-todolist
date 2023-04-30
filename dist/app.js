const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
function App() {
  const [activity, setActivity] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  function generateId() {
    return Date.now();
  }
  function addTodoHandler(event) {
    event.preventDefault();
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Simple Todo List"), /*#__PURE__*/React.createElement("form", {
    onSubmit: addTodoHandler
  }, /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    type: "text",
    placeholder: "Nama aktifitas ...",
    value: activity,
    onChange: event => setActivity(event.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Tambah")), /*#__PURE__*/React.createElement("ul", null, todos.map(todo => /*#__PURE__*/React.createElement("li", {
    key: todo.id
  }, todo.activity, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    onClick: removeTodoHandler.bind(this, todo.id)
  }, "Hapus")))));
}
root.render( /*#__PURE__*/React.createElement(App, null));