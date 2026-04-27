const username = 'Yuriy'
const isLiggedIn = true

const App = () => {
  let content

  if (isLiggedIn) {
    content = 'ты авторизован'
  } else {
    content = 'ты не авторизован'
  }

  const tasks = [
    'Погладить кота',
    'Сделать кофе',
    'Изучить React',
  ]

  return (
    <>
      {/* Это комментарий внутри JSX */} 
      <h1 className="title">To Do List</h1>
      <p>{1 + 1}</p>
      <p>{username.toUpperCase()}</p>
      <p>{new Date().toLocaleDateString()}</p>
      <hr />
      <label htmlFor="email">Email:</label>
      <input id="email" type="email" required={true} />

      {/* Условный рендеринг */}
      {isLiggedIn && <p style={{ color: 'red', fontWeight: 700 }}>Привет, {username}!</p>}
      {isLiggedIn ? `Привет, ${username}!` : 'Пожалуйста, залогиньтесь!'}
      {isLiggedIn ? <p>Привет, {username}</p> : <button>Аавторизоваться</button>}
      {content}

      <ul>
        {/* Рендер массива */}
        {tasks.map((task, index) => <li key={index}>{task}</li>)} {/* Плохая практика для ключа использовать index */}
        {tasks.map((task) => <li key={task}>{task}</li>)} {/* В данном случае так правильнее */}
      </ul>
    </>
  )
}

export default App
