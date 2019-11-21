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

//store the table data nodes
const td = document.querySelectorAll('td');
    
// when td is clicked, open dialog to adjust value
td.forEach(ele => {
    ele.addEventListener('click', function (e) {
      // toggle the modal window open and visible
      dialog.setAttribute('aria-hidden', false);
      dialog.classList.toggle('closed');
      dialogBg.classList.toggle('closed');
      // get the main input field, set the current value, and give it focus
      const valueInput = dialog.querySelector('.selectedValue');
      valueInput.value = parseInt(e.target.textContent, 10);
      valueInput.focus();
      // call the function to listen for the esc key press
      escModal();
      // listen for the key presses - if tab, call function to manage tab trapping; if space or enter, call function to manage adjustment buttons
      dialog.addEventListener('keydown', (e) => {
        if (e.keyCode === 9) {
          trapTab(e);
        }
        // call function to prevent event default while on adjustment keys
        if (e.keyCode === 13 || e.keyCode === 32) {
          adjustmentButtons(e);
        }
      });
    });
});

// store close button in dialog, then if clicked close the modal
const closeDialog = document.querySelector('#close');
closeDialog.addEventListener('click', function (e) {
  closeModal(e);
})

// close the modal window
function closeModal(e) {
  e.preventDefault();
  dialog.setAttribute('aria-hidden', true);
  dialog.classList.toggle('closed');
  dialogBg.classList.toggle('closed');
}

// if esc pressed & modal open, close modal (27)
function escModal() {
  // listen for esc key code, then if the dialog is open, close it
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      if (!dialog.classList.contains('closed')) {
        closeModal(e);
      }
    }
  })
}

// when tab has been pressed, check direction & keep tab in modal
function trapTab(evt) {
  // get the first and last items in the dialog that can be focused
  const firstItem = document.querySelector('#close');
  const lastItem = document.querySelector('.sendButton');
  // if shift is pressed & the first item is active, go to the bottom
  if (evt.shiftKey && document.activeElement === firstItem) {
    lastItem.focus();
    evt.preventDefault();
    // if shift is not pressed & last item is active, go to the top
  } else if 
    (!evt.shiftKey && document.activeElement === lastItem) {
      firstItem.focus();
      evt.preventDefault();
  }
}

// adjustment keys - prevent default for space and enter presses
function adjustButtons(evt) {
  const buttonsToCheck = document.querySelectorAll('.adjusters');
  const currButton = document.activeElement;
  if (buttonsToCheck.contains(currButton)) {
    evt.preventDefault();
  }
}