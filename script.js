// Get all the draggable elements
const dragObjects = document.querySelectorAll('.drag-object');

// Add event listeners for each element
dragObjects.forEach(dragObject => {
    dragObject.addEventListener('mousedown', dragStart);
    dragObject.addEventListener('mouseup', dragEnd);
});

let currentDrag;
let overlapMessage;

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

    //Move the element as the mouse moves
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        // Check for overlapping elements
        overlapMessage = '';
        dragObjects.forEach(dragObject => {
            if (dragObject !== currentDrag) {
                const rect1 = currentDrag.getBoundingClientRect();
                const rect2 = dragObject.getBoundingClientRect();

                if (rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top
                ) {
                    overlapMessage = "It's Overlapping!";
                }
            }
        });

        // Display the overlap message
        const messageDiv = document.getElementById('massage');
        messageDiv.innerHTML = overlapMessage;
    }

    // This function will be called when the user stops dragging the element
    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        currentDrag.style.pointerEvents = 'auto';
        currentDrag = null;

        // Clear the overlap message
        const messageDiv = document.getElementById('massage');
        messageDiv.innerHTML = '';
    }
}

// This function will be called when the user stops dragging an element
function dragEnd(event) {
    currentDrag = null;
}