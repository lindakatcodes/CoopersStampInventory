const stampTable = document.getElementById('stamps');
const accTable = document.getElementById('extras');

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