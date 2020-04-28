import PageForm from "./PageForm";

const PageList = (argument = "") => {
  let pageContent = document.querySelector("#pageContent");
  let form = document.querySelector("#form");

  // PageForm();
  const preparePage = () => {
    // PageForm();

    document.querySelector("#form").innerHTML = `
    <form id="searchmovie" class="justify-content-end mt-5 mb-5 row">
      <div class="input-group col-md-6 align-self-end">
        <div class="input-group-prepend">
          <div style="background-color: #FFFF;" class="input-group-text">
            <i class="fa fa-search"></i></div>
          </div>
          <input type="text" class="form-control" id="movie-search" placeholder="search Game..">
        </div>
      </div>
      <a id="search-movie" onclick="geturl()" type="submit" class="btn btn-primary">Go</a>
    </form>
        `;

    const geturl = () => {
      //let search = document.getElementById("movie-search").value;
      console.log("hey");
    };

    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      } else {
        finalURL =
          "https://api.rawg.io/api/games?dates=2020-05-01,2021-05-01&ordering=-added";
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((game) => {
            articles += `
                  <div class="col-sm-4 cardGame">
                  
                    <a class="" href = "#pagedetail/${game.id}">
                    <img width="350px" src="${game.background_image}">
                    </a>
                    <h1 class="mt-3">${game.name}</h1>
                  
                  </div>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div id="form" class=""></div>
        <div class="articles row">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};
export default PageList;
