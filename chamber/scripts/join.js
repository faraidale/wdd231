// 1. Set Hidden Timestamp
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// 2. Modal Logic
const modalTriggers = document.querySelectorAll('.modal-trigger');
const closeButtons = document.querySelectorAll('.close-modal');

// Open Modals
modalTriggers.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.showModal();
    });
});

// Close Modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});
