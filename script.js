// Get all the draggable elements
const dragObjects = document.querySelectorAll('.drag-object');

// Add event listeners for each element
dragObjects.forEach(dragObject => {
    dragObject.addEventListener('mousedown', dragStart);
    dragObject.addEventListener('mouseup', dragEnd);
});

let currentDrag;

// This function will be called when the user starts dragging an element
function dragStart(event) {
    currentDrag = event.target;
    currentDrag.style.position = 'absolute';
    currentDrag.style.zIndex = 1000;
    currentDrag.style.pointerEvents = 'none';
    document.body.append(currentDrag);

    moveAt(event.pageX, event.pageY);

    // Move the element to the current mouse position
    function moveAt(pageX, pageY) {
        currentDrag.style.left = pageX - currentDrag.offsetWidth / 2 + 'px';
        currentDrag.style.top = pageY - currentDrag.offsetHeight / 2 + 'px';
    }

    // Add event listeners for the rest of the dragging process
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Move the element as the mouse moves
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // This function will be called when the user stops dragging the element
    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        currentDrag.style.pointerEvents = 'auto';
        currentDrag = null;
    }
}

// This function will be called when the user stops dragging an element
function dragEnd(event) {
    currentDrag = null;
}