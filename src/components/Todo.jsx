import { useEffect, useState } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import TodoInfo from "./TodoInfo"
import TodoList from "./TodoList"

const Todo = () => {
	// В качестве начального значения передадим функцию, цель которой вернуть начальное значение для tasks
	// Тут мы попытаемся вытянуть начальное значение из localStorage
	// Эта ф-я по сути выполняется еще до первого рендера, что эффективно
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem('tasks')

		if (savedTasks) {
			return JSON.parse(savedTasks)
		}

		return [
			{ id: 'task-1', title: 'Купить молока', isDone: false },
			{ id: 'task-2', title: 'Погладить кота', isDone: true },
		]
	})

	const [newTaskTitle, setNewTaskTitle] = useState('')

	const [searchQuery, setSearchQuery] = useState('')

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

	const addTasks = () => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: crypto?.randomUUID() ?? Date.now().toString(), // Генерируем уникальный id более новым или старым способом, если браузер не поддерживает crypto
				title: newTaskTitle,
				isDone: false
			}

			setTasks([...tasks, newTask]) // Через спред оператор разворачиваем прежнее сосотояние tasks и в конце добавляем новый элемент newTask
			setNewTaskTitle('') // После добавления задачи обнуляем taskTitle через ф-ю setNewTaskTitle
			setSearchQuery('')
		}
	}

	useEffect(() => {
		// Т.к. данные в localStorage можно хранить только в виде строк, то сохраняем сущность tasks предварительно преобразуя ее в JSON строку через метод stringify
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	const clearSearchQuery = searchQuery.trim().toLowerCase()
	const filteredTasks = clearSearchQuery.length > 0
		? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
		: null // Если в поле фильтра будет пусто или только пробелы, то в filteredTasks будет null

	return (
		<div className="todo">
			<h1 className="todo__title">Список задач</h1>
			<AddTaskForm
				addTasks={addTasks}
				newTaskTitle={newTaskTitle}
				setNewTaskTitle={setNewTaskTitle}
			/>
			<SearchTaskForm 
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			<TodoInfo
				total={tasks.length}
				done={tasks.filter(({ isDone }) => isDone).length}
				onDeleteAllButtonClick={deleteAllTasks}
			/>
			<TodoList
				tasks={tasks}
				filteredTasks={filteredTasks}
				onDeleteTaskButtonClick={deleteTask}
				onTaskCompleteChange={toggleTaskComplete}
			/>
		</div>
	)
}

export default Todo