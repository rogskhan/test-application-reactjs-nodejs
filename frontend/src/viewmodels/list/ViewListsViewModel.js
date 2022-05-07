import { useState, useEffect } from "react"
import ListModel from "../../data/ListModel"

const ViewListsViewModel = (events) => {
    const [skip, setSkip] = useState(0)

   const onLoadLists = () => {
        events.onLoadWaiting()
        ListModel.get(skip).then(
            function(data) {
                events.onLoadSuccess(data)
            },
            function(error) {
                events.onLoadError(error)
            }
        )
    }

    const onListDelete = (id) => {
        events.onDeleteWaiting(id)
        ListModel.delete(id).then(
            function(data) {
                events.onDeleteSuccess(data)
            },
            function(error) {
                events.onDeleteError(id, error)
            }
        )
    }

    const onLoadMore = () => {
        setSkip(skip + 5)
    }
    
    useEffect(() => {
        onLoadLists()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skip])

    return {
        onLoadMore,
        onListDelete
    }
}

export default ViewListsViewModel