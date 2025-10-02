let messages = [];
const prompts = document.getElementById("prompts");
const chatContainer = document.getElementById("chatContainer");

const showLoading = (container) => {
  container.innerHTML = `
    <span class="loading-spinner">
      <i class="fa-solid fa-spinner fa-spin fa-lg"></i>
      Thinking...
    </span>
  `;
};

const getGeminiResponse = async () => {
  const apiKey = 'AIzaSyCc4tjLVnLA2KuANocV5isGQ5F2o14Mup0';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;

  const promptText = prompts.value.trim();
  if (!promptText) {
    return;
  }

  const userDiv = document.createElement("div");
  userDiv.classList.add("user-msg");
  userDiv.textContent = promptText;
  chatContainer.appendChild(userDiv);

  const aiDiv = document.createElement("div");
  aiDiv.classList.add("ai-msg");
  showLoading(aiDiv);
  chatContainer.appendChild(aiDiv);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }]
      })
    });
    const data = await response.json();

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No output received";

    messages.push({
      msg: promptText,
      response: aiText
    });

    aiDiv.textContent = aiText;
    prompts.value = "";

    console.log("Messages array:", messages);
  } catch (err) {
    aiDiv.textContent = "Error: " + err.message;
    console.log(err);
  }
};

prompts.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    getGeminiResponse();
  }
});

// Sidebar toggle logic
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const themeToggle = document.getElementById('themeToggle');
  const themeOptions = document.getElementById('themeOptions');
  const themeBtns = document.querySelectorAll('.theme-option');

  // Sidebar show/hide
  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('expanded');
  });

  // Theme dropdown show/hide
  let themeDropdownOpen = false;
  themeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    themeOptions.style.display = themeDropdownOpen ? 'none' : 'flex';
    themeDropdownOpen = !themeDropdownOpen;
  });

  // Hide theme dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!themeToggle.contains(e.target) && !themeOptions.contains(e.target)) {
      themeOptions.style.display = 'none';
      themeDropdownOpen = false;
    }
  });

  // Theme switching
  function setTheme(theme) {
    document.body.classList.remove('theme-red', 'theme-blue', 'theme-green', 'theme-white', 'theme-black');
    document.body.classList.add('theme-' + theme);
    localStorage.setItem('theme', theme);
    themeBtns.forEach(btn => btn.classList.remove('selected'));
    const selectedBtn = document.querySelector('.theme-option[data-theme="' + theme + '"]');
    if (selectedBtn) selectedBtn.classList.add('selected');
  }
  themeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      setTheme(this.getAttribute('data-theme'));
    });
  });

  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'red';
  setTheme(savedTheme);
});
