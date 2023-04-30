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
				activity,
			};

			// Filter
			const editTodoIndex = todos.findIndex((todo) => todo.id === edit.id);

			// Set
			const updatedTodos = [...todos];
			updatedTodos[editTodoIndex] = updatedTodo;
			setTodos(updatedTodos);

			// Remove cancel edit
			return cancelEditHandler();
		}

		setTodos([
			...todos,
			{
				id: generateId(),
				activity,
				done: false,
			},
		]);

		setActivity("");
	}

	function removeTodoHandler(todoId) {
		const filteredTodos = todos.filter((todo) => todo.id !== todoId);

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
			done: todo.done ? false : true,
		};

		// Filter
		const editTodoIndex = todos.findIndex((currentTodo) => currentTodo.id === todo.id);

		// Set
		const updatedTodos = [...todos];
		updatedTodos[editTodoIndex] = updatedTodo;
		setTodos(updatedTodos);

		// // Remove cancel edit
		// return cancelEditHandler();
	}

	return (
		<>
			<h1>Simple Todo List</h1>

			{message && (
				<div style={{ color: "red" }}>
					<i>{message}</i>
				</div>
			)}

			<form onSubmit={saveTodoHandler}>
				<input autoFocus type="text" placeholder="Nama aktifitas ..." value={activity} onChange={(event) => setActivity(event.target.value)} />
				<button type="submit">{edit.id ? "Simpan" : "Tambah"}</button>
				{edit.id && <button onClick={cancelEditHandler}>Batal edit</button>}
			</form>

			{todos.length > 0 ? (
				<ul>
					{todos.map((todo) => (
						<li key={todo.id}>
							<input type="checkbox" checked={todo.done} onChange={doneTodoHandler.bind(this, todo)} />
							{todo.activity} ({todo.done ? "Selesai" : "Belum selesai"})
							<button type="submit" onClick={editTodoHandler.bind(this, todo)}>
								Edit
							</button>
							<button type="submit" onClick={removeTodoHandler.bind(this, todo.id)}>
								Hapus
							</button>
						</li>
					))}
				</ul>
			) : (
				<p>
					<i>Tidak ada aktifitas.</i>
				</p>
			)}
		</>
	);
}

root.render(<App />);
