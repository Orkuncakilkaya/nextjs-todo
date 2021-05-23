import {supabase} from '../../../utils/init-supabase';
import {TodoModel} from '../../models/todo.model';

const createTodo = async (req: any, res: any) => {
    const {data: todo, error} = await supabase.from<TodoModel>('todos')
        .update({title: req.body.title})
        .eq('id', req.body.id);

    if (error) {
        res.status(400).json({error});
        return;
    }

    res.status(200).json({data: todo});
};

export default createTodo;
