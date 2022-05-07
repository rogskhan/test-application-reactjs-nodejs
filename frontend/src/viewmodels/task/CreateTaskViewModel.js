import { useState } from "react"
import TaskModel from "../../data/TaskModel"
import Helper from "../../utils/Helper"
import { useParams } from "react-router-dom"

const CreateTaskViewModel = (events) => {
    let { listId } = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState(Helper.addMinutes(new Date(), 60))

    const validate = () => {
        if (listId === "") {
            events.onError("List cannot be empty!")
            return false
        } else if (name === "") {
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
            TaskModel.create(listId, name, description, deadline).then(
                function() {
                    events.onSuccess()
                },
                function(error) {
                    events.onError(error)
                }
            )
        }
    }

    const getListId = () => {
        return listId
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

    return {
        getListId,
        onSetName,
        onSetDescription,
        onSetDeadline,
        onClickSave
    }
}

export default CreateTaskViewModel