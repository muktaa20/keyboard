document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const keys = document.querySelectorAll(".key");
  
    // Track Caps Lock state
    let isCapsLockOn = false;
  
    // Function to handle key press
    function handleKeyPress(event) {
      try {
        const keyCode = event.keyCode || event.which;
        const keyElement = document.querySelector(`.c${keyCode}`);
  
        if (keyElement) {
          keyElement.classList.add("keydown");
        }
  
        let keyText = event.key; // Get actual key pressed
  
        // Handle special keys
        switch (keyText) {
          case "Enter":
            display.value += "\n";
            break;
          case "Tab":
            event.preventDefault(); // Prevent tab from moving focus
            display.value += "    ";
            break;
          case "Backspace":
            display.value = display.value.slice(0, -1);
            break;
          case " ":
            display.value += " ";
            break;
          case "CapsLock":
            isCapsLockOn = !isCapsLockOn;
            break;
          case "Shift":
          case "Control":
          case "Alt":
          case "Meta": // Windows or Command key
          case "Escape":
            // Do nothing for modifier keys
            break;
          case "ArrowUp":
            display.value += "↑";
            break;
          case "ArrowDown":
            display.value += "↓";
            break;
          case "ArrowLeft":
            display.value += "←";
            break;
          case "ArrowRight":
            display.value += "→";
            break;
          case "Delete":
            display.value = display.value.slice(1);
            break;
          default:
            if (keyText.length === 1) {
              // Handle Caps Lock effect
              if (isCapsLockOn || event.shiftKey) {
                display.value += keyText.toUpperCase();
              } else {
                display.value += keyText.toLowerCase();
              }
            }
        }
      } catch (error) {
        console.error("Error handling key press:", error);
      }
    }
  
    // Function to handle key release
    function handleKeyRelease(event) {
      try {
        const keyCode = event.keyCode || event.which;
        const keyElement = document.querySelector(`.c${keyCode}`);
  
        if (keyElement) {
          keyElement.classList.remove("keydown");
        }
      } catch (error) {
        console.error("Error handling key release:", error);
      }
    }
  
    // Add event listeners for keyboard events
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease);
  
    // Handle mouse clicks on virtual keys
    keys.forEach((key) => {
      key.addEventListener("mousedown", () => {
        try {
          const keyText = key.innerText.trim();
          key.classList.add("keydown");
  
          switch (keyText.toLowerCase()) {
            case "enter":
              display.value += "\n";
              break;
            case "tab":
              display.value += "    ";
              break;
            case "backspace":
              display.value = display.value.slice(0, -1);
              break;
            case "space":
              display.value += " ";
              break;
            default:
              if (keyText.length === 1) {
                display.value += keyText;
              }
          }
        } catch (error) {
          console.error("Error handling virtual key press:", error);
        }
      });
  
      key.addEventListener("mouseup", () => {
        key.classList.remove("keydown");
      });
    });
  });