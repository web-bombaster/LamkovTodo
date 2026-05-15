import Button from "./Button"
import Field from "./Field"

const AddTaskForm = (props) => {
	const {
		addTasks,
		newTaskTitle,
		setNewTaskTitle,
		newTaskInputRef,
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
				label="Название задачи"
				id="new-task"
				value={newTaskTitle}
				onInput={(event) => setNewTaskTitle(event.target.value)}
				ref={newTaskInputRef}
			/>
			<Button type='submit'>+</Button>
		</form>
	)
}

export default AddTaskForm