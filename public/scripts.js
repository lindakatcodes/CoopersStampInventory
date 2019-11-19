const stampTable = document.getElementById('stamps');
const accTable = document.getElementById('extras');
const inkTable = document.getElementById('inks');
const dialog = document.querySelector('.dialogForeground');
const dialogBg = document.querySelector('.dialogBackground');

// initial data pull, when page is first loaded
const data = fetch('http://localhost:8080/getdata')
    .then(response => response.json())
    .then(res => {
        const initData = res;

        // for each db item, find it's equal DOM item and set the value
        for (let i = 0; i < initData.length; i++) {
            const name = initData[i].name;
            const nameDiv = document.getElementById(name);
            nameDiv.textContent = initData[i].qty;
        }
    })

// when td is clicked, open dialog to adjust value
const td = document.querySelectorAll('td');

td.forEach(ele => {
    ele.addEventListener('click', function (e) {
      dialog.setAttribute('aria-hidden', false);
      dialog.classList.toggle('closed');
      dialogBg.classList.toggle('closed');
    });
});

// dialog settings / functionality
const closeDialog = document.querySelector('#close');
closeDialog.addEventListener('click', function (e) {
  e.preventDefault();
  dialog.setAttribute('aria-hidden', true);
  dialog.classList.toggle('closed');
  dialogBg.classList.toggle('closed');
})
