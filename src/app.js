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
	}

	return (
		<div className="row">
			<div className="col">
				<div className="text-center mb-3">
					<h1>Simple Todo-list Application</h1>

					<span className="mb-3 mt-2 d-inline-block h6 font-monospace font-weight-light text-muted">
						Made with{" "}
						<svg fill="red" xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-heart-fill" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
						</svg>{" "}
						by{" "}
						<a href="https://github.com/alfianchii" className="text-decoration-none" target="_blank">
							Alfian
						</a>
					</span>
				</div>

				{message && (
					<div className="alert alert-danger" role="alert">
						{message}
					</div>
				)}
			</div>

			<form className="mb-3" onSubmit={saveTodoHandler}>
				<div className="input-group mb-3">
					<input autoFocus type="text" className="form-control" id="activity-name" placeholder="Activity name ..." value={activity} onChange={(event) => setActivity(event.target.value)} />
					<button className="btn btn-outline-primary" type="submit">
						{edit.id ? "Save" : "Add"}
					</button>
					{edit.id && (
						<button className="btn btn-outline-danger me-2" onClick={cancelEditHandler}>
							Cancel
						</button>
					)}
				</div>
			</form>

			<hr />

			<table className="table table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th>Activity</th>
						<th>Status</th>
						<th>Action</th>
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
									<td className="align-middle">{todo.done ? <span className="badge text-bg-success">Done</span> : <span className="badge text-bg-danger">On progress</span>}</td>
									<td className="align-middle">
										<button className="btn btn-primary me-2 mb-2" type="submit" onClick={editTodoHandler.bind(this, todo)}>
											Edit
										</button>
										<button className="btn btn-danger me-2 mb-2" type="submit" onClick={removeTodoHandler.bind(this, todo.id)}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</>
					) : (
						<tr>
							<td colSpan="4">
								<p className="text-center mt-3">There was no activity.</p>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

root.render(<App />);
