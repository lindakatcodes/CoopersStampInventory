const stampTable = document.getElementById('stamps');
const accTable = document.getElementById('extras');
// const initData = [];

const data = fetch('http://localhost:8080/getdata')
.then(response => response.json())
.then(res => {
    const initData = res;

    for (let i = 1, row; row = stampTable.rows[i]; i++) {
        
        for (let j = 1, col; col = row.cells[j]; j++) {
          let currId = col.id;
          
        }  
     }
})