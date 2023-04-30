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

	return (
		<>
			<h1>Simple Todo List</h1>

			<form onSubmit={addTodoHandler}>
				<input type="text" placeholder="Nama aktifitas ..." value={activity} onChange={(event) => setActivity(event.target.value)} />
				<button type="submit">Tambah</button>
			</form>

			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.activity}
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
