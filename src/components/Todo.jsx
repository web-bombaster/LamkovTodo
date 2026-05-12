import { useState } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"

const Todo = () => {
	const [tasks, setTasks] = useState(
		[
			{ id: 'task-1', title: 'Купить молока', isDone: false },
			{ id: 'task-2', title: 'Погладить кота', isDone: true },
		]
	)

	const [newTaskTitle, setNewTaskTitle] = useState('')

	const deleteAllTasks = () => {
		const isConfirmed = confirm('Вы действительно хотите удалить ВСЕ таски?')
		if (isConfirmed) {
			setTasks([])
		}
	}

	const deleteTask = (taskId) => {
		setTasks(
			tasks.filter((task) => task.id !== taskId)
		)
	}

	const toggleTaskComplete = (taskId, isDone) => {
		setTasks(
			tasks.map(task => {
				if (task.id === taskId) {
					return {...task, isDone}
				}

				return task
			})
		)
	}

	const filterTasks = (query) => {
		console.log(`Поиск: ${query}`)
	}

	const addTasks = () => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: crypto?.randomUUID() ?? Date.now().toString(), // Генерируем уникальный id более новым или старым способом, если браузер не поддерживает crypto
				title: newTaskTitle,
				isDone: false
			}

			setTasks([...tasks, newTask]) // Через спред оператор разворачиваем прежнее сосотояние tasks и в конце добавляем новый элемент newTask
			setNewTaskTitle('') // После добавления задачи обнуляем taskTitle через ф-ю setNewTaskTitle
		}
	}

	return (
		<div className="todo">
			<h1 className="todo__title">To Do List</h1>
			<AddTaskForm
				addTasks={addTasks}
				newTaskTitle={newTaskTitle}
				setNewTaskTitle={setNewTaskTitle}
			/>
			<SearchTaskForm onSearchInput={filterTasks} />
			<TodoInfo
				total={tasks.length}
				done={tasks.filter(({ isDone }) => isDone).length}
				onDeleteAllButtonClick={deleteAllTasks}
			/>
			<TodoList
				tasks={tasks}
				onDeleteTaskButtonClick={deleteTask}
				onTaskCompleteChange={toggleTaskComplete}
			/>
		</div>
	)
}

export default Todo