const $wrapper = document.querySelector("[data-wrapper]");
console.log($wrapper);

const genCat = (
  cat
) => `<div data-card_id="${cat.id}" class="card" style="width: 18rem;">
<img src="${cat.image}" style="width: 286px; height: 300px; object-fit: cover;" alt="${cat.name}">
<div class="card-body">
  <h5 class="card-title">${cat.name}</h5>
  <p class="card-text">${cat.description}</p>
  <button data-action="show" class="btn btn-primary">Show</button>
  <button data-action="delete" class="btn btn-danger">Delete</button>
</div>
</div>`;

$wrapper.addEventListener("click", (event) => {
  switch (event.target.dataset.action) {
    case "delete":
      const $currentCard = event.target.closest("[data-card_id]");
      const catId = $currentCard.dataset.card_id;
      api.delCat(catId);
      $currentCard.remove();
      break;

    default:
      break;
  }
});

document.forms.catsForm.addEventListener("submit", () => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());

  data.name;
  data.idNumber = Number(data.idNumber);
  data.urlCat;
  data.ageCat = Number(data.ageCat);
  data.rating = Number(data.rating);
  data.favorite = data.favorite === "on";
  data.description;
  
  api.addCat(data).then(Response)
});

const api = new Api("kg");
api
  .getCats()
  .then((Response) => Response.json())
  .then((data) =>
    data.forEach((value) => {
      $wrapper.insertAdjacentHTML("beforeend", genCat(value));
    })
  );
