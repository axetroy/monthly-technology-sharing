self.onmessage = function (event) {
  const imageData = event.data;

  const pixels = Array.from(imageData).map((p) => {
    return p.toString(2).padStart("8", 0).slice(0, -1) + "0";
  });

  self.postMessage(pixels);
};
