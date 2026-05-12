import Button from "./Button"
import Field from "./Field"

const AddTaskForm = (props) => {
	const {
		addTasks,
		newTaskTitle,
		setNewTaskTitle,
	} = props

	// Чтобы страница не перезагружалась при отправке формы, напишем свою ф-ю onSubmit
	const onSubmit = (event) => {
		event.preventDefault()
		addTasks()
	}

	return (
		<form className="todo__form" onSubmit={onSubmit}>
			<Field
				className="todo__field"
				label="New task title"
				id="new-task"
				value={newTaskTitle}
				onInput={(event) => setNewTaskTitle(event.target.value)}
			/>
			<Button type='submit'>Add</Button>
		</form>
	)
}

export default AddTaskForm