import { useState, useEffect } from "react"
import TaskModel from "../../data/TaskModel"
import ListModel from "../../data/ListModel"

import { useParams } from "react-router-dom"

const ViewTasksViewModel = (events) => {
    let { listId } = useParams()
    const [skip, setSkip] = useState(0)
    
   const onLoadTasks = () => {
        events.onLoadWaiting()
        TaskModel.get(listId, skip).then(
            function(data) {
                events.onLoadSuccess(data)
            },
            function(error) {
                events.onLoadError(error)
            }
        )
    }

    const onTaskDelete = (id) => {
        events.onDeleteWaiting(id)
        TaskModel.delete(id).then(
            function(data) {
                events.onDeleteSuccess(data)
            },
            function(error) {
                events.onDeleteError(id, error)
            }
        )
    }

    const onTaskComplete = (id) => {
        events.onCompleteWaiting(id)
        TaskModel.complete(id).then(
            function(data) {
                events.onCompleteSuccess(data)
            },
            function(error) {
                events.onCompleteError(id, error)
            }
        )
    }
    
    const onTasksDelete = (ids) => {
        events.onMultiDeleteWaiting()
        TaskModel.deleteMany(ids).then(
            function(_ids) {
                events.onMultiDeleteSuccess(_ids)
            },
            function(error) {
                events.onMultiDeleteError(error)
            }
        )
    }
    
    const onFindLists = (search) => {
         events.onSearchListsWaiting()
         ListModel.find(search).then(
            function(data) {
                events.onSearchListsSuccess(data)
            },
            function(error) {
                events.onSearchListsError(error)
            }
        )
     }

     const onMoveTasks = (newListId, ids) => {
        events.onMultiDeleteWaiting()
        TaskModel.moveMany(newListId, ids).then(
            function(_ids) {
                events.onMultiDeleteSuccess(_ids)
            },
            function(error) {
                events.onMultiDeleteError(error)
            }
        )
    }

    const onLoadMore = () => {
        setSkip(skip + 5)
    }

    const onSearchLists = (q) => {
        onFindLists(q)
    }
    
    useEffect(() => {
        onLoadTasks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skip])

    return {
        onLoadMore,
        onTaskDelete,
        onTasksDelete,
        onSearchLists,
        onMoveTasks,
        onTaskComplete
    }
}

export default ViewTasksViewModel