import {supabase} from '../utils/init-supabase';
import {IncomingMessage} from 'http';
import {DefaultLayout} from '../components/layouts/default.layout';
import {User} from '@supabase/gotrue-js';
import {TodoForm} from '../components/todo/todo-form';
import {TodoModel} from './models/todo.model';
import {TodoList} from '../components/todo/todo-list';

interface Props {
    user: User;
    todos?: TodoModel[];
}

export default function Home({user, todos}: Props) {
    return (
        <DefaultLayout user={user}>
            <TodoForm/>
            <TodoList initialTodos={todos ?? []}/>
        </DefaultLayout>
    );
}

export async function getServerSideProps({req, res}: { req: IncomingMessage, res: any }) {

    let {user} = await supabase.auth.api.getUserByCookie(req);

    const {data: todos} = await supabase.from<TodoModel>('todos').select('*');

    if (!user) {
        return {redirect: {destination: '/auth/login', permanent: false}};
    }

    return {props: {user, todos: todos ?? []}};
}
