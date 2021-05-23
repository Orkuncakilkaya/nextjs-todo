import {supabase} from '../../utils/init-supabase';
import {TodoModel} from '../../pages/models/todo.model';
import {useCallback, useEffect, useState} from 'react';
import {postApi} from '../../utils/fetcher';
import {ApiResponseModel} from '../../pages/models/api.response.model';
import {TodoItem} from './todo-item';

interface Props {
    initialTodos: TodoModel[];
}

export const TodoList = ({initialTodos}: Props) => {
    const [todos, setTodos] = useState<TodoModel[]>(initialTodos);

    useEffect(() => {
        const subscription = supabase.from<TodoModel>('todos')
            .on('*', payload => {
                if (payload.eventType === 'INSERT') {
                    setTodos(oldTodos => [...oldTodos, payload.new]);
                } else if (payload.eventType === 'UPDATE') {
                    setTodos(oldTodos => [...oldTodos.filter(t => t.id !== payload.new.id), payload.new]);
                } else if (payload.eventType === 'DELETE') {
                    setTodos(oldTodos => [...oldTodos.filter(t => t.id !== payload.old.id)]);
                }
            }).subscribe();
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        todos.length > 0 ? (
            <div className="bg-white shadow-xl rounded p-5 mt-2 w-6/12 mx-auto border border-gray-300">
                {todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
            </div>
        ) : null
    );
};
