import {supabase} from '../../../utils/init-supabase';
import {TodoModel} from '../../models/todo.model';

const listTodo = async (req: any, res: any) => {
    const {data: todos, error} = await supabase.from<TodoModel>('todos')
        .select('*');

    if (error) {
        res.status(400).json({error});
        return;
    }

    res.status(200).json({data: todos});
};
