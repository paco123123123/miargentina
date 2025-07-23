const refreshBtn = document.getElementById("reload-btn");

refreshBtn.addEventListener('click', () => {
    updateDate();
  });

function updateDate(){
    let date = new Date();
    let dateString = date.getDate().toString().padStart(2, "0") + "/" + (date.getMonth() + 1).toString().padStart(2, "0") + "/" + date.getFullYear() + " " + date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ' hs';
    document.getElementById("last-updated-label").innerHTML = "Última actualización " + dateString;

}

window.onload = updateDate();