class Api {
  constructor(name) {
    this.url = "https://cats.petiteweb.dev/api/single/";
    this.name = name;
  }

  async getCats() {
    try {
      const response = await fetch(`${this.url}${this.name}/show`);
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCat(id) {
    try {
      const response = await fetch(`${this.url}${this.name}/show/${id}`);
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  getIdCats() {
    return fetch(`${this.url}${this.name}/show/ids`);
  }

  async addCat(newCat) {
    try {
      const response = await fetch(`${this.url}${this.name}/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCat),
      });

      if (response.status !== 200) {
        throw new Error();
      }
    } catch (error) {
      throw new Error(error);
    }
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


