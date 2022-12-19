const $wrapper = document.querySelector("[data-wrapper]");
const $addButton = document.querySelector('[data-action="addButton"]');
const $modal = document.querySelector("[data-modal]");
const $overlay = document.querySelector(".dm-overlay");

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

const showModalCat = (cat) => `<div data-card-show>

    <img src="${cat.image}" class="img_card_show" alt="${cat.name}">
  

  
 
    <div class="card__info"> 
      <h3 class="card-title mt-2">${cat.name}</h3>
      <p class="card-text text-center p-3">${cat.description}</p>
      <button data-action-add class="btn btn-success btn-success-edit"">Edit</button>
    </div>
    
  
</div>

`;

const createShowModalEditCard = (cat) => `
  <div data-modal-edit class="modal-wrapper">
      
      <div class="d-flex justify-content-center custom-modal">
          <form name="catsFormEdit">
              <div>
                  <h3>Изменение</h3>
                  <label for="name">Имя персонажа</label>
                  <input type="text" class="form-control mb-2" placeholder="Введите имя" name="name" id="name" value="${
                    cat.name
                  }" />

                  <label for="image">Url изображения персонажа</label>
                  <input type="url" class="form-control mb-2" name="image" id="image" placeholder="https://" value="${
                    cat.image
                  }" />

                  <label for="age">Врозраст персонажа</label>
                  <input type="number" class="form-control mb-2" name="age" id="age" value="${
                    cat.age
                  }" />

                  <label for="rate">Оценка по 10 бальной</label>
                  <input type="range" min="0" max="10" class="form-control mb-2" name="rate" id="rate" value="${
                    cat.rate
                  }"/>

                  <div class="mb-3 form-check">
                      <label for="favorite" class="form-check-label">Чумба!</label>
                      <input type="checkbox" class="form-check-input mb-2" name="favorite" id="favorite"${
                        cat.favorite ? "checked" : " "
                      }/>
                  </div>

                  <label for="description">Пара слов о персонаже</label>
                  <input type="text" class="form-control mb-2" name="description" id="description" value="${
                    cat.description
                  }"/>
                  <button type="submit" class="btn btn-primary">Торпедировать перса</button>
              </div>

          </form>
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

    case "show":
      const $currentCard = event.target.closest("[data-card_id]");
      const catId = $currentCard.dataset.card_id;
      let $currentCardShow;
      let edit;
      let cardObj;

      const closeModalCard = () => {
        $overlay.classList.add("hidden");
        $currentCardShow.remove();
        console.log(event);
        console.log(event.target);
      };

      api
        .getCat(catId)
        .then((data) => {
          cardObj = data;
          $overlay.insertAdjacentHTML("afterend", showModalCat(cardObj));
          $currentCardShow = document.querySelector("[data-card-show]");
          edit = document.querySelector("[data-action-add]");
        });

      $overlay.classList.remove("hidden");
      $overlay.addEventListener("click", closeModalCard);

      setTimeout(() => {
        edit.addEventListener("click", () => {
          $overlay.removeEventListener("click", closeModalCard);

          $overlay.insertAdjacentHTML(
            "afterend",
            createShowModalEditCard(cardObj)
          );

          $overlay.style.zIndex = 8;

          $overlay.addEventListener(
            "click",
            () => {
              $overlay.style.zIndex = 1;
              let modal = document.querySelector("[data-modal-edit]");
              modal.remove();

              $overlay.addEventListener("click", closeModalCard);
            },
            100
          );

          document.forms.catsFormEdit.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log(event);
            const data = Object.fromEntries(
              new FormData(event.target).entries()
            );
            console.log(data);
            data.id = Number(cardObj.id);
            data.age = Number(data.age);
            data.rate = Number(data.rate);
            data.favorite = data.favorite === "on";
            api
              .updCat(data, cardObj.id)
              .then(
                (Response) => Response.ok && $modal.classList.add("hidden")
              );
          });
        });
      }, 100);

      break;
  }
});

document.forms.catsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
  const data = Object.fromEntries(new FormData(event.target).entries());
  data.id = Number(data.id);
  data.age = Number(data.age);
  data.rate = Number(data.rate);
  data.favorite = data.favorite === "on";
  api.addCat(data).then((Response) => {
    $wrapper.insertAdjacentHTML("beforeend", genCat(Response));
    $modal.classList.add("hidden");
    event.target.reset();
  });
});

$addButton.addEventListener("click", () => {
  $modal.classList.remove("hidden");
  $overlay.classList.remove("hidden");

  $overlay.addEventListener(
    "click",
    () => {
      $modal.classList.add("hidden");
      $overlay.classList.add("hidden");
    },
    { once: true }
  );
});

const api = new Api("kg");
api.getCats().then((Response) => {
  Response.forEach((value) => {
    $wrapper.insertAdjacentHTML("beforeend", genCat(value));
  });
});
