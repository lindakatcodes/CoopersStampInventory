const stampTable = document.getElementById('stamps');
const accTable = document.getElementById('extras');
const inkTable = document.getElementById('inks');
const dialog = document.querySelector('.updateForm');

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
        dialog.showModal();
        e.preventDefault();

        let value = e.target.innerText;
        dialog.querySelector('.selectedValue').value = value;
        
        const adjusts = dialog.querySelectorAll('.adjust');
        
        adjusts.forEach(button => {
            // for some reason, this value being passed is the click event for the button, and not the value from above?!?!
            button.addEventListener('click', function (value) {
                e.preventDefault();
                let newValue = parseInt(value, 10);
                console.log(value, newValue);
                switch (button.id) {
                    case 'minfive':
                        newValue -= 5;
                        dialog.querySelector('.selectedValue').value = newValue;
                        break;
                    case 'minone':
                        newValue -= 1;
                        dialog.querySelector('.selectedValue').value = newValue;
                        break;
                    case 'addone':
                        newValue += 1;
                        dialog.querySelector('.selectedValue').value = newValue;
                        break;
                    case 'addfive':
                        newValue += 5;
                        dialog.querySelector('.selectedValue').value = newValue;
                        break;
                }
            })
        })
    });
});
