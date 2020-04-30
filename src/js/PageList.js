//import GameHover from "./GameHover";

const PageList = (argument = "", platforms = "", developers = "") => {
  let pageContent = document.querySelector("#pageContent");

  console.log("argument:", argument);
  console.log("platformId:", platforms);
  console.log("developer:", developers);

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;

      if (argument && platforms) {
        finalURL = url + "?search=" + argument + "&paltforms=" + platforms;
      } else if (argument && developers) {
        finalURL = url + "?search=" + argument + "&developers=" + developers;
      } else if (developers) {
        finalURL = url + "?developers" + developers;
      } else if (platforms) {
        finalURL =
          "https://api.rawg.io/api/games?dates=2020-05-01,2021-05-01&ordering=-added&platforms=" +
          platforms;
      } else if (argument) {
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
                <div id="${game.id}" class="text-center col-sm-4 cardGame">
                  <a class="" href = "#pagedetail/${game.id}">
                  <img id="${game.id}" width="350px" src="${game.background_image}">
                  </a>
                  <h1 class="mt-3">${game.name}</h1>
                </div>`;

            document.querySelector(".page-list .articles").innerHTML = articles;

            document.querySelectorAll(".cardGame").forEach((card) => {
              let savecontent = card.innerHTML;
              card.addEventListener("mouseenter", function (event) {
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
                card.innerHTML = `${savecontent}`;
              });
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
