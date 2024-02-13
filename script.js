document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const participantsList = document.getElementById('participantsList');

    // Function to display expenses
    const displayExpense = (name, amount, paidBy, participants) => {
        const li = document.createElement('li');
        const dateTime = new Date().toLocaleString(); // Get current date and time
        li.textContent = `Date/Time: ${dateTime}, Name: ${name}, Amount: ${amount}, Paid By: ${paidBy}, Participants: ${participants}`;
        expenseList.appendChild(li);
    };

    // Function to create a participant item with a tick mark
    const createParticipantItem = (name, paidBy) => {
        const div = document.createElement('div');
        div.classList.add('form-check');
        div.innerHTML = `<input type="checkbox" id="${name}" name="participant" value="${name}" class="form-check-input">
                         <label for="${name}" class="form-check-label">${name} (Paid by: ${paidBy})</label>`;
        participantsList.appendChild(div);

        // Add event listener to the checkbox
        const checkbox = div.querySelector(`input[type="checkbox"]`);
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                // Remove the participant from the list
                div.remove();
            }
        });
    };

    // Event listener for form submission
    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Retrieve values from form fields
        const name = document.getElementById('name').value;
        const amount = document.getElementById('amount').value;
        const paidBy = document.getElementById('paidBy').value;
        const participants = document.getElementById('participants').value.split(',').map(name => name.trim());

        // Display the expense
        displayExpense(name, amount, paidBy, participants.join(', '));

        // Clear the form fields
        expenseForm.reset();

        // Create participant items with tick marks
        participants.forEach(participant => createParticipantItem(participant, paidBy));
    });

    // Event listener for adding participants by pressing Enter key
    const participantsInput = document.getElementById('participants');
    participantsInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default behavior of Enter key
            const participant = participantsInput.value.trim();
            if (participant) {
                participantsInput.value = ''; // Clear the input field
                const currentValue = participantsInput.value;
                participantsInput.value = currentValue ? `${currentValue}, ${participant}` : participant;
                createParticipantItem(participant, document.getElementById('paidBy').value); // Create participant item with tick mark
            }
        }
    });
});
