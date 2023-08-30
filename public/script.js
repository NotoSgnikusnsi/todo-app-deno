window.onload = async () => {
  try {
    const response = await fetch('/get-tasks');
    const json = await response?.json();
    const taskList = document.getElementById('tasks');
    if (json && json[0] !== undefined) {
      for (let i = 0; i < json.length; i++) {
        // box
        const boxDiv = document.createElement('div');
        boxDiv.classList.add('box');

        // タスクを表示させる場所
        const divTask = document.createElement('p');
        divTask.id = json[i]['_id'];
        const taskTitle = json[i]['task'];
        const taskCompleteLabel = document.createElement("label")
        taskCompleteLabel.classList.add("checkbox")
        const taskCompleteInput = document.createElement("input")
        taskCompleteInput.setAttribute("type", "checkbox");
        taskCompleteInput.classList.add("checkbox");
        taskCompleteInput.checked = json[i]["complete"];
        taskCompleteLabel.appendChild(taskCompleteInput);
        // const taskComplete = json[i]['complete'] ? '完了済' : '未完了';
        taskTitle.prepend(taskCompleteLabel);
        divTask.appendChild(taskTitle);
        divTask.classList.add('notification');

        // 削除ボタン
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete', 'is-right');
        deleteButton.onclick = handleDeleteButtonClick;

        divTask.appendChild(deleteButton);
        boxDiv.appendChild(divTask);
        taskList.appendChild(boxDiv);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

document.getElementById('todo-button').onclick = async (e) => {
  e.preventDefault();
  const task = document.getElementById('todo-input').value;
  try {
    // display loading icon
    document.getElementById('todo-button').classList.add('is-loading');

    // POST task
    await fetch('/add-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: task }),
    });

    // hidden loading icon
    document.getElementById('todo-button').classList.remove('is-loading');
    // reload
    window.location.reload();
  } catch (error) {
    console.log(error);
    return;
  }
};

const handleDeleteButtonClick = async (e) => {
  e.preventDefault();
  if (confirm('削除します') === false) {
    return;
  }
  const id = e.target.parentNode.id;
  try {
    await fetch('/delete-task?id=' + id);
    location.reload();
  } catch (error) {
    console.log(error);
    return;
  }
};
