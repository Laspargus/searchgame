//import GameHover from "./GameHover";

const PageList = (argument = "", platformId = "") => {
  let pageContent = document.querySelector("#pageContent");

  const preparePage = () => {
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
            let filter = false;

            if (platformId) {
              if (game.platforms !== null) {
                game.platforms.forEach((array) => {
                  if (array.platform.id == platformId) {
                    filter = true;
                  }
                });
              }
            } else filter = true;
            if (filter) {
              articles += `
                <div id="${game.id}" class="text-center col-sm-4 cardGame">
                  <a class="" href = "#pagedetail/${game.id}">
                  <img id="${game.id}" width="350px" src="${game.background_image}">
                  </a>
                  <h1 class="mt-3">${game.name}</h1>
                </div>`;
            }
            console.log(game);
          });

          //la date de sortie, l'éditeur, le(s) genre(s) du jeu, ainsi que sa note et le nombre de votes
          document.querySelector(".page-list .articles").innerHTML = articles;

          document.querySelectorAll(".cardGame").forEach((card) => {
            let savecontent = card.innerHTML;
            card.addEventListener("mouseenter", function (event) {
              console.log(card);
              console.log(event.target.id);

              card.innerHTML = "";
              response.results.forEach((game) => {
                if (game.id == event.target.id) {
                  card.innerHTML = `
                    <p>Released : ${game.released}</p>
                    <p>Genre : ${game.genres[0].name}</p>
                    <p>Rating : ${game.rating}</p>
                    <p>Voting : ${game.ratings_count}</p>
                    <a class="btn btn-danger" href = "#pagedetail/${game.id}">See detail</a>        
                 `;
                }
              });
            });

            card.addEventListener("mouseleave", function (event) {
              console.log(savecontent);
              card.innerHTML = `${savecontent}`;
            });
          });
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
          <section class="page-list">
            <div class="articles row">...loading</div>
          </section>
        `;
    preparePage();
  };

  render();
};

export default PageList;
