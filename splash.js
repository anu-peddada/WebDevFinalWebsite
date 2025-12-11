const keys = [
  { label: 'Introduction', subtitle: 'Home Page', href: 'index.html', color: 'rgb(142, 135, 247)' },
  { label: 'See My Journey', subtitle: 'My Core Story', href: 'core-story.html', color: 'rgb(120, 110, 230)' },
  { label: 'Discover My Work', subtitle: 'Projects', href: 'projects.html', color: 'rgb(100, 85, 215)' },
  { label: 'Connect With Me', subtitle: 'Contact Page', href: 'contact.html', color: 'rgb(89, 78, 248)' }
];

class PhysicsKey {
  constructor(data, index, total) {
    this.data = data;
    this.index = index;
    this.total = total;
    this.element = null;
    this.velocity = 0;
    this.rotation = 0;
    this.isHovered = false;
    this.gravity = 0.2;
    this.damping = 0.98;
    this.angularDamping = 0.95;
    this.angularVelocity = 0;

    this.create();
    this.placeInCircle();
    this.animate();
  }

  create() {
    const keyDiv = document.createElement('div');
    keyDiv.className = 'key';
    keyDiv.innerHTML = `
      <div class="key-string"></div>
      <div class="key-body">
        <div class="key-head"></div>
        <div class="key-teeth"></div>
      </div>
      <div class="key-label">${this.data.label}</div>
    `;

    // Position in circular pattern
    const angle = (this.index / this.total) * Math.PI * 2;
    const radius = 120;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    keyDiv.style.left = 'calc(50% + ' + x + 'px)';
    keyDiv.style.top = 'calc(50% + ' + y + 'px)';
    keyDiv.style.transform = `translate(-50%, -50%) rotate(${angle * 57.2958}deg)`;

    keyDiv.addEventListener('mouseenter', () => this.onHover());
    keyDiv.addEventListener('click', () => {
      localStorage.setItem('visitedPortfolio', 'true');
      window.location.href = this.data.href;
    });

    this.element = keyDiv;
    document.querySelector('.keys-container').appendChild(keyDiv);

    // Add drop animation
    setTimeout(() => {
      keyDiv.classList.add('dropping');
    }, this.index * 150);
  }

  placeInCircle() {
    const angle = (this.index / this.total) * Math.PI * 2;
    const radius = 120;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  onHover() {
    if (this.isHovered) return;
    this.isHovered = true;

    // Other keys swing up to top
    keys.forEach((_, idx) => {
      if (idx !== this.index) {
        const otherKey = document.querySelectorAll('.key')[idx];
        otherKey.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        otherKey.style.transform = `translate(-50%, -180px) rotateZ(0deg)`;
        otherKey.style.opacity = '0.6';
      }
    });

    // This key stays visible and enlarged
    this.element.style.zIndex = '10';
  }

  onLeave() {
    this.isHovered = false;

    // Reset all keys to original positions
    keys.forEach((_, idx) => {
      const keyEl = document.querySelectorAll('.key')[idx];
      const angle = (idx / this.total) * Math.PI * 2;
      const radius = 120;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      keyEl.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      keyEl.style.transform = `translate(-50%, -50%) rotate(${angle * 57.2958}deg) translateY(0)`;
      keyEl.style.opacity = '1';
      keyEl.style.zIndex = idx === this.index ? '10' : '1';
    });
  }

  animate() {
    // Simple dangling swing animation
    this.element.addEventListener('mouseleave', () => this.onLeave());
    this.element.classList.add('dangling');
  }
}

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

  // Create all keys with physics
  keys.forEach((keyData, idx) => {
    new PhysicsKey(keyData, idx, keys.length);
  });

  // Redirect to home after 10 seconds if user doesn't interact
  let interactionTimeout = setTimeout(() => {
    // Optional: auto-redirect to home after delay
    // window.location.href = 'index.html';
  }, 10000);

  // Clear timeout on any interaction
  document.addEventListener('click', () => clearTimeout(interactionTimeout));
  document.addEventListener('mousemove', () => clearTimeout(interactionTimeout));
});
