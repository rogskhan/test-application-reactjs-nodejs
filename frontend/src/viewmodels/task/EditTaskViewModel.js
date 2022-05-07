import { useState, useEffect } from "react"
import TaskModel from "../../data/TaskModel"
import { useParams } from "react-router-dom"

const EditTaskViewModel = (events) => {
    let { id } = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState(null)

    const validate = () => {
        if (name === "") {
            events.onError("Name cannot be empty!")
            return false
        } else if (description === "") {
            events.onError("Description cannot be empty!")
            return false
        } else if (deadline === "") {
            events.onError("Deadline cannot be empty!")
            return false
        }
        return true
    }

   const onClickSave = () => {
        if (validate()) {
            events.onWaiting()
            TaskModel.update(id, name, description, deadline).then(
                function() {
                    events.onSuccess()
                },
                function(error) {
                    events.onError(error)
                }
            )
        }
    }

    const onLoadTask = () => {
        events.onLoadWaiting()
        TaskModel.item(id).then(
            function(task) {
                setName(task.name)
                setDescription(task.description)
                setDeadline(new Date(task.deadline))
                events.onLoadSuccess(task)
            },
            function(error) {
                events.onLoadError(error)
            }
        )
    }

    const onSetName = (value) => {
        setName(value)
    }
    
    const onSetDescription = (value) => {
        setDescription(value)
    }
    
    const onSetDeadline = (value) => {
        setDeadline(value)
    }

    useEffect(() => {
        onLoadTask()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return {
        onSetName,
        onSetDescription,
        onSetDeadline,
        onClickSave
    }
}

export default EditTaskViewModel