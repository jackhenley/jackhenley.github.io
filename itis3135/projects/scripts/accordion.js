/**
 * Accordion functionality for procedure pages
 * Makes accordion items collapsible with expand/collapse toggle button
 */

/**
 * Toggle accordion section open/closed
 * @param {HTMLElement} button - The button element clicked
 */
function toggleAccordion(button) {
    button.classList.toggle('active');
    const content = button.parentElement.nextElementSibling;

    if (content && content.classList.contains('accordion-content')) {
        if (content.style.display === 'block') {
            content.style.display = 'none';
            button.textContent = '+';
        } else {
            content.style.display = 'block';
            button.textContent = '−';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach((button) => {
        // Open all accordion items by default
        button.classList.add('active');
        button.textContent = '−';
        const content = button.parentElement.nextElementSibling;
        if (content && content.classList.contains('accordion-content')) {
            content.style.display = 'block';
        }

        // Add click event listeners
        button.addEventListener('click', function() {
            toggleAccordion(this);
        });
    });
});

