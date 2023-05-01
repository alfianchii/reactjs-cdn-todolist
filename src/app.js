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
		<div className="row">
			<div className="col">
				<h1 className="text-center mb-4">Simple Todo-list Application</h1>

				{message && (
					<div className="alert alert-danger" role="alert">
						{message}
					</div>
				)}
			</div>

			<form className="mb-3" onSubmit={saveTodoHandler}>
				<div className="input-group mb-3">
					<input autoFocus type="text" className="form-control" id="nama-aktifitas" placeholder="Nama aktifitas ..." value={activity} onChange={(event) => setActivity(event.target.value)} />
					<button className="btn btn-outline-primary" type="submit">
						{edit.id ? "Simpan" : "Tambah"}
					</button>
					{edit.id && (
						<button className="btn btn-outline-danger me-2" onClick={cancelEditHandler}>
							Batal edit
						</button>
					)}
				</div>
			</form>

			<hr />

			<table className="table table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th>Aktifitas</th>
						<th>Status</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{todos.length > 0 ? (
						<>
							{todos.map((todo, index) => (
								<tr key={todo.id}>
									<td className="align-middle">{index + 1}</td>
									<td className="align-middle">
										<input className="form-check-input me-2" type="checkbox" checked={todo.done} id={todo.id} onChange={doneTodoHandler.bind(this, todo)} />
										<label className="form-check-label" htmlFor={todo.id}>
											{todo.activity}
										</label>
									</td>
									<td className="align-middle">{todo.done ? <span className="badge text-bg-success">Selesai</span> : <span className="badge text-bg-danger">Belum selesai</span>}</td>
									<td className="align-middle">
										<button className="btn btn-success me-1" type="submit" onClick={editTodoHandler.bind(this, todo)}>
											Edit
										</button>
										<button className="btn btn-danger me-1" type="submit" onClick={removeTodoHandler.bind(this, todo.id)}>
											Hapus
										</button>
									</td>
								</tr>
							))}
						</>
					) : (
						<tr>
							<td colSpan="4">
								<p className="text-center mt-3">Tidak ada aktifitas.</p>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

root.render(<App />);
