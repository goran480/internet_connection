//const { setTimeout } = require("timers/promises");

const popup = document.querySelector(".popup");
wifiIcon = document.querySelector(".icon i");
popupTitle = document.querySelector(".popup .title");
popupDesc = document.querySelector(".desc");
reconnectBtn = document.querySelector(".reconnect");

let isOnline = true,
  intervalId,
  timer = 10;

const checkConnection = async () => {
  try {
    //Try to fetch random data from the API. If the status code is between 200 and 300, the network connection is considered online.
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false; //If there is an error, the connection is considered offline.
  }
  //isOnline = false;
  timer = 10;
  clearInterval(intervalId);
  handlePopup(isOnline);
};

const handlePopup = (status) => {
  if (status) {
    wifiIcon.className = "uil uil-wifi";
    popupTitle.innerText = "Restored Connection";
    popupDesc.innerHTML =
      "Your device is now succesfully connected to the internet";
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show"), 2000);
    //return popup.classList.remove("show");
  }
  // if is offline
  wifiIcon.className = "uil uil-wifi-slash";
  popupTitle.innerText = "Lost Connection";
  popupDesc.innerHTML =
    "Your network is unavaliable. We will attempt to reconnect you in 10 seconds";
  popup.className = "popup show";

  intervalId = setInterval(() => {
    timer--;
    if (timer === 0) checkConnection();
    popup.querySelector(".desc b").innerText = timer;
  }, 1000);
};

// Check the connection status every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);
