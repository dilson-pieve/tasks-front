import {instance} from './configs'

export default {
    listTasks:() => {
        return instance.get('tasks')
    },
    saveTask:(task) => {
        return instance.post('task', task)
    },
    updateTask:(task) => {
        return instance.put('task', task)
    },
    deleteTask:(task) => {
        return instance.delete('task', {data: task})
    }
}