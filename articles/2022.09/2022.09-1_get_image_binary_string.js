self.onmessage = function (event) {
  const imageData = event.data;

  let str = "";

  for (let index = 0; index < imageData.length - 1; index += 1) {
    str += imageData[index].toString(2).padStart("8", 0);
  }

  self.postMessage(str);
};
