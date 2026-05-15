import TodoItem from "./TodoItem"

const TodoList = (props) => {
	const {
		tasks = [],
		filteredTasks,
		onDeleteTaskButtonClick,
		onTaskCompleteChange,
		firstIncompleteTaskRef,
		firstIncompleteTaskId,
	} = props

	const hasTasks = tasks.length > 0
	const isEmptyFilteredTasks = filteredTasks?.length === 0

	if (!hasTasks) {
		return <div className="todo__empty-message">Задач пока нет</div>
	}

	if (hasTasks && isEmptyFilteredTasks) {
		return <div className="todo__empty-message">Задачи не найдены</div>
	}
	
	return (
		<ul className="todo__list">
		
			{(filteredTasks ?? tasks).map((task) => ( // Проверим, если filteredTasks не null, то будем рендерить отфильтрованные задачи. В ином случае, все задачи.
				<TodoItem
					className='todo__item'
					key={task.id}
					ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
					onDeleteTaskButtonClick={onDeleteTaskButtonClick}
					onTaskCompleteChange={onTaskCompleteChange}
					{...task}
				/>

			))}
		</ul>
	)
}

export default TodoList