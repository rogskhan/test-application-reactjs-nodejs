import { useState } from "react"
import ListModel from "../../data/ListModel"

const CreateListViewModel = (events) => {
    const [name, setName] = useState("")

    const validate = () => {
        if (name === "") {
            return false
        }
        return true
    }

   const onClickSave = () => {
        if (validate()) {
            events.onWaiting()
            ListModel.create(name).then(
                function(data) {
                    events.onSuccess(data)
                },
                function(error) {
                    events.onError(error)
                }
            )
        } else {
            events.onError("Name cannot be empty!")
        }
    }

    const onSetName = (value) => {
        setName(value)
    }

    return {
        onSetName,
        onClickSave
    }
}

export default CreateListViewModel