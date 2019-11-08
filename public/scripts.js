const datadiv = document.getElementById('tempdata');

const data = fetch('http://localhost:8080/getdata').then(res => {
    // const readdata = res.body;
    datadiv.innerHTML = res.body;
})