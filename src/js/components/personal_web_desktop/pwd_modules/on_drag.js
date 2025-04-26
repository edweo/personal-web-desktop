// /**
//  * Event listener to move the selected window
//  * @param {HTMLElement} target event target element
//  * @param {number} movementX event mouse moved in X pixels
//  * @param {number} movementY event mouse moved in Y pixels
//  */
// const onDrag = ({ target, movementX, movementY }) => {
//   moveElement(target, movementX, movementY)
// }

/**
 * Moves an HTML element in x and y direction
 * @param {HTMLElement} htmlElement element to move
 * @param {number} x move pixels in x direction
 * @param {number} y move pixels in y direction
 */
const moveElement = (htmlElement, x, y) => {
  const currentX = htmlElement.getBoundingClientRect().x
  const currentY = htmlElement.getBoundingClientRect().y
  htmlElement.style.transform = `translate(${currentX + x}px, ${currentY + y}px)`
}

export { moveElement }
