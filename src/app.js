const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

function App() {
	const [activity, setActivity] = React.useState("");
	const [todos, setTodos] = React.useState([]);

	function addTodoHandler(event) {
		event.preventDefault();

		setTodos([...todos, activity]);
		setActivity("");
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
					<li key={todo}>{todo}</li>
				))}
			</ul>
		</>
	);
}

root.render(<App />);
