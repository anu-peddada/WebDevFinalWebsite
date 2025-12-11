window.onload = function(){
    let count = 0;

    // Typing animation for home page
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const name = "Anu Peddada";
        let index = 0;
        
        function typeName() {
            if (index < name.length) {
                typingElement.textContent = name.substring(0, index + 1);
                index++;
                setTimeout(typeName, 150);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeName, 500);
    }

    // Like counter functionality
    const counterButton = document.getElementById('counter-inc');
    if (counterButton) {
        counterButton.addEventListener('click', function() {
            count++;
            const counterValue = document.getElementById('counter-value');
            if (counterValue) {
                counterValue.textContent = count;
            }
        });
    }
};
