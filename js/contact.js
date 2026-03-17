const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

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

// Återställ formuläret om användaren går tillbaka med webbläsarens bakåtknapp
window.addEventListener('pageshow', (e) => {
    if (e.persisted) form.reset();
});
