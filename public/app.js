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
    if (!activity) return setMessage("Nama aktifitas jangan kosong!");

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

    // // Remove cancel edit
    // return cancelEditHandler();
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-center mb-4"
  }, "Simple Todo-list Application"), message && /*#__PURE__*/React.createElement("div", {
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
    id: "nama-aktifitas",
    placeholder: "Nama aktifitas ...",
    value: activity,
    onChange: event => setActivity(event.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-primary",
    type: "submit"
  }, edit.id ? "Simpan" : "Tambah"), edit.id && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-danger me-2",
    onClick: cancelEditHandler
  }, "Batal edit"))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("table", {
    className: "table table-striped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "Aktifitas"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Aksi"))), /*#__PURE__*/React.createElement("tbody", null, todos.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, todos.map((todo, index) => /*#__PURE__*/React.createElement("tr", {
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
  }, "Selesai") : /*#__PURE__*/React.createElement("span", {
    className: "badge text-bg-danger"
  }, "Belum selesai")), /*#__PURE__*/React.createElement("td", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success me-1",
    type: "submit",
    onClick: editTodoHandler.bind(this, todo)
  }, "Edit"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger me-1",
    type: "submit",
    onClick: removeTodoHandler.bind(this, todo.id)
  }, "Hapus"))))) : /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-center mt-3"
  }, "Tidak ada aktifitas."))))));
}
root.render( /*#__PURE__*/React.createElement(App, null));