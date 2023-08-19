const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function fetchImage() {
  const inputValue = parseInt(document.getElementById("input").value);

  if (isNaN(inputValue) || inputValue > 10 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Number should be between 0 and 11";
    return;
  }

  let imgs = "";

  try {
    btnEl.style.display = "none";
    const loading = `<img src="BeanEater.svg" />`;
    galleryEl.innerHTML = loading;
    const response = await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=B8S3zB8gCPVCvzpAhCRdfXg_aki8PZM_q5pAyzDUvlc`);
    const data = await response.json();

        if (data) {
          data.forEach((pic) => {
            imgs += `
            <img src=${pic.urls.small} alt="image"/>
            `;
            galleryEl.style.display = "block";
            galleryEl.innerHTML = imgs;
            btnEl.style.display = "block";
            errorMessageEl.style.display = "none";
          });
        }

      } catch (error) {
        console.error(error);
        errorMessageEl.style.display = "block";
        errorMessageEl.innerHTML = "An error happened try again later.";
        btnEl.style.display = "block";
        galleryEl.style.display = "none";
      }
    }
btnEl.addEventListener("click", fetchImage)