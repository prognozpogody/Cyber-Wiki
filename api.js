class Api {
  constructor(name) {
    this.url = "https://cats.petiteweb.dev/api/single/";
    this.name = name;
  }

  getCats() {
    return fetch(`${this.url}${this.name}/show`);
  }

  getCat(id) {
    return fetch(`${this.url}${this.name}/show/${id}`);
  }

  getIdCats() {
    return fetch(`${this.url}${this.name}/show/ids`);
  }

  addCat(newCat) {
    return fetch(`${this.url}${this.name}/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCat),
    });
  }

  updCat(chnCat, id) {
    return fetch(`${this.url}${this.name}/update/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chnCat),
    });
  }
  
  delCat(id) {
    return fetch(`${this.url}${this.name}/delete/${id}`, {
      method: "DELETE",
    });
  }
}
