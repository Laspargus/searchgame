import PageForm from "./PageForm";

const PageList = (argument = "") => {
  let pageContent = document.querySelector("#pageContent");
  let form = document.querySelector("#form");

  // PageForm();
  const preparePage = () => {
    PageForm();

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
