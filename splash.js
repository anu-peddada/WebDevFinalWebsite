const keys = [
  { label: 'Introduction', href: 'index.html', color: 'rgb(142, 135, 247)' },
  { label: 'See My Journey', href: 'core-story.html', color: 'rgb(120, 110, 230)' },
  { label: 'Discover My Work', href: 'projects.html', color: 'rgb(100, 85, 215)' },
  { label: 'Connect With Me', href: 'contact.html', color: 'rgb(89, 78, 248)' }
];

class DraggableKey {
  constructor(data, index, total) {
    this.data = data;
    this.index = index;
    this.total = total;
    this.element = null;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.offsetX = 0;
    this.offsetY = 0;

    this.create();
    this.placeKey();
  }

  create() {
    const keyDiv = document.createElement('div');
    keyDiv.className = 'key';
    keyDiv.draggable = true;
    keyDiv.innerHTML = `
      <div class="key-visual">
        <div class="key-head"></div>
        <div class="key-teeth"></div>
      </div>
      <div class="key-label">${this.data.label}</div>
    `;

    // Position keys horizontally below door
    keyDiv.style.position = 'relative';
    keyDiv.style.left = 'auto';
    keyDiv.style.top = 'auto';
    keyDiv.style.transform = 'none';

    // Drag events
    keyDiv.addEventListener('dragstart', (e) => this.onDragStart(e));
    keyDiv.addEventListener('dragend', (e) => this.onDragEnd(e));
    keyDiv.addEventListener('touchstart', (e) => this.onTouchStart(e));
    keyDiv.addEventListener('touchmove', (e) => this.onTouchMove(e));
    keyDiv.addEventListener('touchend', (e) => this.onTouchEnd(e));

    // Drop animation
    setTimeout(() => {
      keyDiv.classList.add('dropping');
    }, this.index * 150);

    this.element = keyDiv;
    document.getElementById('keys-container').appendChild(keyDiv);
  }

  placeKey() {
    const angle = (this.index / this.total) * Math.PI * 2;
    const radius = 160;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
  }

  onDragStart(e) {
    this.isDragging = true;
    this.element.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('keyIndex', this.index);
    
    // Custom drag image
    const dragImage = document.createElement('div');
    dragImage.style.width = '60px';
    dragImage.style.height = '85px';
    dragImage.style.background = 'linear-gradient(135deg, rgb(142, 135, 247) 0%, rgb(100, 85, 215) 100%)';
    dragImage.style.borderRadius = '8px';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-9999px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 30, 42);
  }

  onDragEnd(e) {
    this.isDragging = false;
    this.element.classList.remove('dragging');
  }

  onTouchStart(e) {
    this.isDragging = true;
    this.element.classList.add('dragging');
    this.dragStartX = e.touches[0].clientX;
    this.dragStartY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    this.offsetX = currentX - this.dragStartX;
    this.offsetY = currentY - this.dragStartY;
    
    const rect = this.element.getBoundingClientRect();
    const newX = rect.left + this.offsetX;
    const newY = rect.top + this.offsetY;
    
    this.element.style.position = 'fixed';
    this.element.style.left = newX + 'px';
    this.element.style.top = newY + 'px';
  }

  onTouchEnd(e) {
    this.isDragging = false;
    this.element.classList.remove('dragging');
    
    const doorEl = document.getElementById('door');
    const doorRect = doorEl.getBoundingClientRect();
    const keyRect = this.element.getBoundingClientRect();
    
    const keyCenter = {
      x: keyRect.left + keyRect.width / 2,
      y: keyRect.top + keyRect.height / 2
    };
    
    const doorCenter = {
      x: doorRect.left + doorRect.width / 2,
      y: doorRect.top + doorRect.height / 2
    };
    
    const distance = Math.sqrt(
      Math.pow(keyCenter.x - doorCenter.x, 2) + 
      Math.pow(keyCenter.y - doorCenter.y, 2)
    );
    
    if (distance < 120) {
      this.openDoor();
    } else {
      this.resetPosition();
    }
  }

  resetPosition() {
    this.element.style.position = 'relative';
    this.element.style.left = 'auto';
    this.element.style.top = 'auto';
    this.element.style.transform = 'none';
  }

  openDoor() {
    const door = document.getElementById('door');
    door.classList.add('opening');
    
    setTimeout(() => {
      localStorage.setItem('visitedPortfolio', 'true');
      window.location.href = this.data.href;
    }, 600);
  }
}

// Setup drag and drop for door
function setupDoorDropZone() {
  const door = document.getElementById('door');
  
  door.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    door.style.boxShadow = '0 8px 40px rgba(142, 135, 247, 0.5)';
    door.style.transform = 'translate(-50%, -50%) scale(1.05)';
  });
  
  door.addEventListener('dragleave', () => {
    door.style.boxShadow = '0 6px 30px rgba(142, 135, 247, 0.2)';
    door.style.transform = 'translate(-50%, -50%) scale(1)';
  });
  
  door.addEventListener('drop', (e) => {
    e.preventDefault();
    const keyIndex = parseInt(e.dataTransfer.getData('keyIndex'));
    const keyInstance = keyInstances[keyIndex];
    
    door.classList.add('opening');
    
    setTimeout(() => {
      localStorage.setItem('visitedPortfolio', 'true');
      window.location.href = keys[keyIndex].href;
    }, 600);
  });
}

let keyInstances = [];

// Initialize on page load
window.addEventListener('load', () => {
  // Type out the welcome message
  const typingElement = document.getElementById('typing-text');
  const message = 'Welcome, choose which door you want to explore';
  let index = 0;

  function type() {
    if (index < message.length) {
      typingElement.textContent = message.substring(0, index + 1);
      index++;
      setTimeout(type, 50);
    }
  }

  setTimeout(type, 500);

  // Create all draggable keys
  keys.forEach((keyData, idx) => {
    const keyInstance = new DraggableKey(keyData, idx, keys.length);
    keyInstances.push(keyInstance);
  });

  // Setup door drop zone
  setupDoorDropZone();
});
