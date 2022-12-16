const $wrapper = document.querySelector("[data-wrapper]");
const $addButton = document.querySelector('[data-action="addButton"]');
const $modal = document.querySelector("[data-modal]");

const genCat = (
  cat
) => `<div data-card_id="${cat.id}" class="card m-3 animate__animated animate__fadeIn" style="width: 18rem;">
<img src="${cat.image}" style="width: 286px; height: 300px; object-fit: cover;" alt="${cat.name}">
<div class="card-body text-bg-danger ">
  <h3 class="card-title">${cat.name}</h3>
  <div class="d-flex justify-content-sm-evenly">
  <button data-action="show" class="btn btn-primary">Show</button>
  <button data-action="delete" class="btn btn-danger">Delete</button>
  </div>
</div>
</div>`;

$wrapper.addEventListener("click", (event) => {
  switch (event.target.dataset.action) {
    case "delete":
      // Функционал удаление, убран от похотливых рук
      //_______________________________________________
      // const $currentCard = event.target.closest("[data-card_id]");
      // const catId = $currentCard.dataset.card_id;
      // api.delCat(catId);
      // $currentCard.remove();
      alert("Не надо портить прекрасное!");
      break;

    default:
      break;
  }
});

document.forms.catsForm.addEventListener("submit", () => {
  event.preventDefault();
  console.log(event);
  const data = Object.fromEntries(new FormData(event.target).entries());
  data.id = Number(data.id);
  data.age = Number(data.age);
  data.rate = Number(data.rate);
  data.favorite = data.favorite === "on";
  api
    .addCat(data)
    .then((Response) => Response.ok && $modal.classList.add("hidden"));
});

$addButton.addEventListener("click", () => {
  $modal.classList.remove("hidden");
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
