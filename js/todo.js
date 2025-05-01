const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || { username: 'guest' };
const username = loggedInUser.username;

let allUsers = JSON.parse(localStorage.getItem('allUsersTodos')) || [];

// Helper: Find or create user record
function getUserData() {
  let userData = allUsers.find(user => user.username === username);
  if (!userData) {
    userData = { username, tasks: [] };
    allUsers.push(userData);
  }
  return userData;
}

function saveAllUsers() {
  localStorage.setItem('allUsersTodos', JSON.stringify(allUsers));
}

// --- Core Task Logic ---
function renderTasks() {
  const userData = getUserData();
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  userData.tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed-text' : ''}">${task.text}</span>
      <div class="actions">
        <button onclick="toggleTask(${index})">${task.completed ? '↩️' : '✅'}</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
  saveAllUsers();
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text) {
    const userData = getUserData();
    userData.tasks.push({ text, completed: false });
    input.value = '';
    renderTasks();
  }
}

function toggleTask(index) {
  const userData = getUserData();
  userData.tasks[index].completed = !userData.tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const userData = getUserData();
  const listItem = document.getElementById('taskList').children[index];
  const span = listItem.querySelector('span');
  const editButton = listItem.querySelector('.actions button:nth-child(2)');

  if (span.isContentEditable) {
    userData.tasks[index].text = span.textContent.trim();
    span.contentEditable = false;
    span.classList.remove('editing');
    editButton.textContent = '✏️';
    renderTasks();
  } else {
    span.contentEditable = true;
    span.focus();
    span.classList.add('editing');
    editButton.textContent = '💾';

    span.addEventListener('keydown', function handler(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        userData.tasks[index].text = span.textContent.trim();
        span.contentEditable = false;
        span.classList.remove('editing');
        editButton.textContent = '✏️';
        span.removeEventListener('keydown', handler);
        renderTasks();
      }
    });

    span.addEventListener('blur', function handler() {
      if (span.isContentEditable) {
        userData.tasks[index].text = span.textContent.trim();
        span.contentEditable = false;
        span.classList.remove('editing');
        editButton.textContent = '✏️';
        renderTasks();
      }
      span.removeEventListener('blur', handler);
    });
  }
}

function deleteTask(index) {
  const userData = getUserData();
  userData.tasks.splice(index, 1);
  renderTasks();
}

renderTasks();
