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
				activity,
			};

			// Filter
			const editTodoIndex = todos.findIndex((todo) => todo.id === edit.id);

			// Set
			const updatedTodos = [...todos];
			updatedTodos[editTodoIndex] = updatedTodo;
			return setTodos(updatedTodos);
		}

		setTodos([
			...todos,
			{
				id: generateId(),
				activity,
			},
		]);
		setActivity("");
	}

	function removeTodoHandler(todoId) {
		const filteredTodos = todos.filter((todo) => todo.id !== todoId);

		setTodos(filteredTodos);
	}

	function editTodoHandler(todo) {
		setActivity(todo.activity);
		setEdit(todo);
	}

	return (
		<>
			<h1>Simple Todo List</h1>

			<form onSubmit={saveTodoHandler}>
				<input autoFocus type="text" placeholder="Nama aktifitas ..." value={activity} onChange={(event) => setActivity(event.target.value)} />
				<button type="submit">{edit.id ? "Simpan" : "Tambah"}</button>
			</form>

			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.activity}
						<button type="submit" onClick={editTodoHandler.bind(this, todo)}>
							Edit
						</button>
						<button type="submit" onClick={removeTodoHandler.bind(this, todo.id)}>
							Hapus
						</button>
					</li>
				))}
			</ul>
		</>
	);
}

root.render(<App />);
