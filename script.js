// Architecture Diagram Toggle Content
const architectures = {
  online: `
    <div class="arch-diagram">
      <div class="arch-node-group">
        <div class="arch-node">📁 PDF / Docs Upload</div>
        <div class="arch-node">🌐 Web Browser / App</div>
      </div>
      <div class="arch-arrow">↓ Encrypted TLS 1.3 Transport</div>
      <div class="arch-node-group">
        <div class="arch-node">☁️ Cloud Load Balancer</div>
        <div class="arch-node">🧠 Managed Vector Store</div>
        <div class="arch-node">⚡ High-Speed Inference API</div>
      </div>
      <div class="arch-arrow">↓ Real-time Streaming Response</div>
      <div class="arch-node-group">
        <div class="arch-node" style="color: var(--accent-blue)">✓ Cognidocs Cloud Engine (Sub-second RAG Response)</div>
      </div>
    </div>
  `,
  offline: `
    <div class="arch-diagram">
      <div class="arch-node-group">
        <div class="arch-node" style="border-color: var(--accent-green)">🔐 Air-Gapped Corporate Network</div>
      </div>
      <div class="arch-arrow">↓ Local Internal Network Call (No Internet Required)</div>
      <div class="arch-node-group">
        <div class="arch-node">🐳 Dockerized Cognidocs App</div>
        <div class="arch-node">🗄️ Local pgvector Database</div>
        <div class="arch-node">💻 Local GPU Node (vLLM / Ollama)</div>
      </div>
      <div class="arch-arrow">↓ Zero Data Packets Leave the Building</div>
      <div class="arch-node-group">
        <div class="arch-node" style="color: var(--accent-green)">✓ Air-Gapped Private Q&A Answer</div>
      </div>
    </div>
  `
};

function switchArch(mode) {
  const display = document.getElementById('archDisplay');
  const btnOnline = document.getElementById('btnOnlineArch');
  const btnOffline = document.getElementById('btnOfflineArch');

  if (mode === 'online') {
    display.innerHTML = architectures.online;
    btnOnline.classList.add('active');
    btnOffline.classList.remove('active');
  } else {
    display.innerHTML = architectures.offline;
    btnOffline.classList.add('active');
    btnOnline.classList.remove('active');
  }
}

// Interactive Q&A Demo
function handleKey(event) {
  if (event.key === 'Enter') {
    sendQuestion();
  }
}

function sendQuestion() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  const messages = document.getElementById('chatMessages');

  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = text;
  messages.appendChild(userMsg);

  input.value = '';
  messages.scrollTop = messages.scrollHeight;

  // Bot thinking response
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    
    // Simple response matcher logic for interactive preview
    if (text.toLowerCase().includes('storage') || text.toLowerCase().includes('data')) {
      botMsg.innerHTML = `Data storage must comply with local residency rules. No data exits the designated region unless encrypted with AES-256 keys.<br><span class="citation">Citation: Enterprise_Security_Policy_2026.pdf (Section 4.2)</span>`;
    } else if (text.toLowerCase().includes('mfa') || text.toLowerCase().includes('auth') || text.toLowerCase().includes('network')) {
      botMsg.innerHTML = `All employees accessing local network nodes are required to use multi-factor authentication (MFA).<br><span class="citation">Citation: Enterprise_Security_Policy_2026.pdf (Section 4.2)</span>`;
    } else {
      botMsg.innerHTML = `According to the loaded document, operational controls require strict local adherence and MFA authentication for all user sessions.<br><span class="citation">Citation: Enterprise_Security_Policy_2026.pdf (Page 1)</span>`;
    }

    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 600);
}

// Form Submission
function submitForm(event) {
  event.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = "Thank you! Our enterprise engineering team will reach out within 24 hours.";
  event.target.reset();
}

// Initialize default arch view
document.addEventListener('DOMContentLoaded', () => {
  switchArch('online');
});