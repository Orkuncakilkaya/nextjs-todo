import {supabase} from '../../../utils/init-supabase';
import {TodoModel} from '../../models/todo.model';

const deleteTodo = async (req: any, res: any) => {
    const {error} = await supabase.from<TodoModel>('todos').delete().eq('id', req.body.id);
    if (error) {
        res.status(400).json({error});
        return;
    }

    res.status(200).json({data: {success: true}});
};

export default deleteTodo;
