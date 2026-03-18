const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

const nameInput = form.querySelector('#name');
const emailInput = form.querySelector('#email');
const messageInput = form.querySelector('#message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

function showError(input, errorEl) {
    input.classList.add('invalid');
    errorEl.classList.add('visible');
}

function clearError(input, errorEl) {
    input.classList.remove('invalid');
    errorEl.classList.remove('visible');
}

nameInput.addEventListener('input', () => clearError(nameInput, nameError));
emailInput.addEventListener('input', () => clearError(emailInput, emailError));
messageInput.addEventListener('input', () => clearError(messageInput, messageError));

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let valid = true;

    if (!nameInput.value.trim()) {
        showError(nameInput, nameError);
        valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        showError(emailInput, emailError);
        valid = false;
    }

    if (!messageInput.value.trim()) {
        showError(messageInput, messageError);
        valid = false;
    }

    if (!valid) return;

    const formData = new FormData(form);
    formData.append("access_key", "dffd6df5-7312-4038-9ca7-b24ef6349f93");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Skickar...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Tack! Ditt meddelande har skickats.");
            form.reset();
        } else {
            alert("Något gick fel: " + data.message);
        }

    } catch (error) {
        alert("Det gick inte att skicka. Försök igen.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

window.addEventListener('pageshow', (e) => {
    if (e.persisted) form.reset();
});
