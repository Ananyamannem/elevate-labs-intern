const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

function updateTaskCount() {
  const count = taskList.querySelectorAll('li').length;
  taskCount.textContent = `${count} task${count !== 1 ? 's' : ''}`;
}

function createTaskItem(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '✖';
  removeBtn.className = 'remove-btn';
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    taskList.removeChild(li);
    updateTaskCount();
  });

  li.appendChild(removeBtn);
  return li;
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('Please enter a task.');
    return;
  }

  const taskItem = createTaskItem(text);
  taskList.appendChild(taskItem);
  taskInput.value = '';
  updateTaskCount();
}

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

addTaskBtn.addEventListener('click', addTask);



