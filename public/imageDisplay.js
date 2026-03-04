const imgDisplayer = document.querySelector('#img-displayer');
const imgInput = document.querySelector("#image");

imgInput.addEventListener("change", (e) => {

  const file = e.target.files[0];
  let reader = new FileReader();

  if (file.type && !file.type.startsWith('image/')) {
    console.log('File is not an image.', file.type, file);
    return;
  }

  reader.addEventListener('load', (e) => {
    imgDisplayer.src = e.target.result;
  });
  reader.readAsDataURL(file);

})