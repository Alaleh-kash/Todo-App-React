import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Todo.css';

const Todo = (props) => {
    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/todo')
            .then((result) => {
                const todoData = result.data;
                const todos = [];

                for (const key in todoData) {
                    todos.push({
                        id: key,
                        title: todoData[key].title,
                    });
                }
                setTodoList(todos);
            })
            .catch((err) => {
                setError(err); // Set error state with the caught error
            });
    }, []);

    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    };

    const todoAddHandler = (event) => {
        event.preventDefault();
        setTodoList(todoList.concat(todoName));

        axios
            .post('http://localhost:8000/api/todo', {
                title: todoName,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                setError(err); // Set error state with the caught error
            });

        setTodoName('');
    };

    return (
        <div className="todo">
            <form onSubmit={todoAddHandler}>
                <input
                    type="text"
                    placeholder="Todo.."
                    onChange={inputChangeHandler}
                    value={todoName}
                />
                <button className="btn">Add</button>
            </form>

            <ul>
                {todoList.map((todo) => {
                    return <li key={todo.id}>{todo.title}</li>;
                })}
            </ul>

            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Todo;