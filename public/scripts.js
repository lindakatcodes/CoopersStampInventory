const stampTable = document.getElementById('stamps');
const accTable = document.getElementById('extras');
// const initData = [];

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

    // for (let i = 1, row; row = stampTable.rows[i]; i++) {
        
    //     for (let j = 1, col; col = row.cells[j]; j++) {
    //       let currId = col.id;
          
    //     }  
    //  }
})