import {TodoModel} from '../../pages/models/todo.model';
import {useCallback, useState} from 'react';
import {postApi} from '../../utils/fetcher';
import {ApiResponseModel} from '../../pages/models/api.response.model';

interface Props {
    todo: TodoModel;
}

export const TodoItem = ({todo}: Props) => {
    const [title, setTitle] = useState(todo.title);

    const handleSubmit = useCallback((id: string) => async (ev: React.FormEvent) => {
        ev.preventDefault();
        const {error} = await postApi<ApiResponseModel<TodoModel>>('/api/todo/update', {
            id: todo.id,
            title: title,
        });
    }, [title]);

    const deleteTodo = useCallback(async (id: string) => {
        const {error} = await postApi<ApiResponseModel<any>>('/api/todo/delete', {id: id});
    }, []);

    return (
        <form onSubmit={handleSubmit(todo.id)} className="grid grid-cols-12 gap-1 my-2">
            <input type="text" aria-label={todo.title} defaultValue={todo.title}
                   onChange={e => setTitle(e.target.value)} className="col-span-10 form-control form-control-sm"/>
            <button type="submit" className="col-span-1 btn btn-indigo btn-sm">
                Güncelle
            </button>
            <button type="button" onClick={() => deleteTodo(todo.id)} className="col-span-1 btn btn-red btn-sm">
                Sil
            </button>
        </form>
    );
};
