document.addEventListener('DOMContentLoaded', (event) => {
    const draggables = document.querySelectorAll('.task__item')
    const columns = document.querySelectorAll('.kanban__column')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstard', () => {
            draggable.classList.add('dragging')
        })
        
        draggable.addEventListener('draggend', () => {
            draggable.classList.remove('dragging')
        })
    })

    columns.forEach(column => {
        column.addEventListener('dragover', events => {
            events.preventDefault()
            const draggable = document.querySelector('.task__item')
            column.querySelector('.kanban__list').appendChild(draggable)
        })

    })
})