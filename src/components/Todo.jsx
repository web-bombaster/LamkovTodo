import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import AddTaskForm from "./AddTaskForm"
import Button from "./Button"
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

	const newTaskInputRef = useRef(null)
	const firstIncompleteTaskRef = useRef(null)
	const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id // Находим элемент, у которого isDone = false и получаем его id - т.е. это первая невыполненная задача

	const deleteAllTasks = useCallback(() => {
		const isConfirmed = confirm('Вы действительно хотите удалить ВСЕ таски?')
		if (isConfirmed) {
			setTasks([])
		}
	}, [])

	const deleteTask = useCallback((taskId) => {
		setTasks(
			tasks.filter((task) => task.id !== taskId)
		)
	}, [tasks])

	const toggleTaskComplete = useCallback((taskId, isDone) => {
		setTasks(
			tasks.map(task => {
				if (task.id === taskId) {
					return { ...task, isDone }
				}

				return task
			})
		)
	}, [tasks])

	const addTasks = useCallback(() => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: crypto?.randomUUID() ?? Date.now().toString(), // Генерируем уникальный id более новым или старым способом, если браузер не поддерживает crypto
				title: newTaskTitle,
				isDone: false
			}

			// setTasks([...tasks, newTask]) // Через спред оператор разворачиваем прежнее сосотояние tasks и в конце добавляем новый элемент newTask
			setTasks((prevTasks) => [...prevTasks, newTask]) // В этой записи избавились от tasks, чтобы не указывать в зависимостях для useCallback
			setNewTaskTitle('') // После добавления задачи обнуляем taskTitle через ф-ю setNewTaskTitle
			setSearchQuery('')
			newTaskInputRef.current.focus()
		}
	}, [newTaskTitle])

	useEffect(() => {
		// Т.к. данные в localStorage можно хранить только в виде строк, то сохраняем сущность tasks предварительно преобразуя ее в JSON строку через метод stringify
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	useEffect(() => {
		newTaskInputRef.current.focus()
	}, [])

	const filteredTasks = useMemo(() => {
		const clearSearchQuery = searchQuery.trim().toLowerCase()

		return clearSearchQuery.length > 0
			? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
			: null // Если в поле фильтра будет пусто или только пробелы (поиск не активен), то в filteredTasks будет null и в списке отрендерятся исходные задачи из tasks
	}, [searchQuery, tasks])

	const doneTasks = useMemo(() => {
		return tasks.filter(({ isDone }) => isDone).length
	}, [tasks])

	return (
		<div className="todo">
			<h1 className="todo__title">Список задач</h1>
			<AddTaskForm
				addTasks={addTasks}
				newTaskTitle={newTaskTitle}
				setNewTaskTitle={setNewTaskTitle}
				newTaskInputRef={newTaskInputRef}
			/>
			<SearchTaskForm
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			<TodoInfo
				total={tasks.length}
				done={doneTasks}
				onDeleteAllButtonClick={deleteAllTasks}
			/>
			<Button
				onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}>
				Показать первый невыполненный таск
			</Button>
			<TodoList
				tasks={tasks}
				filteredTasks={filteredTasks}
				firstIncompleteTaskRef={firstIncompleteTaskRef}
				firstIncompleteTaskId={firstIncompleteTaskId}
				onDeleteTaskButtonClick={deleteTask}
				onTaskCompleteChange={toggleTaskComplete}
			/>
		</div>
	)
}

export default Todo