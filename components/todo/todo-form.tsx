import {useCallback, useRef, useState} from 'react';
import {postApi} from '../../utils/fetcher';
import {TodoModel} from '../../pages/models/todo.model';
import {ApiResponseModel} from '../../pages/models/api.response.model';
import classNames from 'classnames';

export const TodoForm = () => {
    const [title, setTitle] = useState<string>('');
    const titleInput = useRef<HTMLInputElement | null>(null);

    const handleSubmit = useCallback(async (ev: React.FormEvent) => {
        ev.preventDefault();
        const {data: todo, error} = await postApi<ApiResponseModel<TodoModel>>('/api/todo/create', {title: title});
        setTitle('');
        if (titleInput.current) {
            titleInput.current.value = '';
        }
    }, [title]);

    return (
        <form onSubmit={handleSubmit}
              className="grid grid-cols-12 gap-1 bg-white shadow-xl rounded p-5 mt-2 w-6/12 mx-auto border border-gray-300">
            <input type="text" id="title" className={classNames('form-control', 'form-control-sm', 'col-span-11')}
                   name="title" ref={titleInput} placeholder="Yapılacak öğeye başlık girin"
                   onChange={e => setTitle(e.target.value)}/>
            <button type="submit" className={classNames('btn', 'btn-indigo', 'btn-sm', 'col-span-1')}>Kaydet</button>
        </form>
    );
};
