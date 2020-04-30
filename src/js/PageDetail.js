const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    let articleContent = "";

    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          let {
            name,
            background_image,
            clip,
            released,
            description,
            tags,
            publishers,
            developers,
            platforms,
          } = response;

          let articleDOM = document.querySelector(".page-detail .article");
          articleDOM.querySelector(".gameImage").src = background_image;
          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("div.description").innerHTML = description;
          articleDOM.querySelector("#trailer").src = clip.clip;
          articleDOM.querySelector("#release").innerHTML = released;
          console.log(articleDOM.querySelector("#release"));
          articleDOM.querySelector("#playstationlink").innerHTML = `
          <a href="https://store.playstation.com/fr-fr/grid/search-game/1?query=${name}">Playstation Store </a>
          `;

          articleDOM.querySelector("#developer").innerHTML = `
          <a href="/#pagelist/?developers=${developers[0].id}" >${developers[0].name}</a>
          `;
          articleDOM.querySelector("#platform").innerHTML = `
          <a href="/#pagelist/?platforms=${platforms[0].platform.id}" > ${platforms[0].platform.name}</a>
          `;

          articleDOM.querySelector("#publisher").innerHTML = publishers[0].name;
          tags.forEach((element) => {
            articleDOM.querySelector("div#screenshot").innerHTML += `
             <div class="col-md-4"><img width="300px" src=${element.image_background}></div>
            `;
          });
        });
    };

    const fetchSimilarGame = (base, id, end) => {
      fetch(`${base}${id}${end}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response.results);
          response.results.forEach((similarGame) => {
            document.querySelector("#similarGame").innerHTML += `
                <div id="${similarGame.id}" class="text-center col-sm-4 cardGame">
                  <a class="" href = "#pagedetail/${similarGame.id}">
                  <img id="${similarGame.id}" width="350px" src="${similarGame.background_image}">
                  </a>
                  <h1 class="mt-3">${similarGame.name}</h1>
                </div>`;
          });
        });
    };

    fetchSimilarGame(
      "https://api.rawg.io/api/games/",
      cleanedArgument,
      "/suggested"
    );

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    document.querySelector("#selectplatform").innerHTML = "";
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <img width="1100px" class="gameImage" src="">
          <h1 class="mt-3 title"></h1>
          <p class="release-date">Release date : <span></span></p>
          <div class="description"></div>
          <div class="mt-5 mb-5 row info">
            <div  class="col-md-3">
              <h3>Release</h3>
              <p id="release"></p>
            </div>
            <div class="col-md-3">
              <h3>Developer</h3>
              <p id="developer"></p>
            </div>
            <div  class="col-md-3">
              <h3>Plateform</h3>
              <p id="platform"></p>
            </div>
            <div  class="col-md-3">
              <h3>Publisher</h3>
              <p id="publisher" ></p>
            </div>
          </div>
          <h2 class="mt-5"> TRAILERS</h2>
          <video width="600px" controls><source id="trailer" src="" type="video/mp4"></video>
          <h2 class="mt-5"> SCREENSHOTS </h2>
          <div class="row" id="screenshot"></div>
          <h2 class="mt-5"> BUY </h2>
          <p id="playstationlink"></p>
          <div id="buy"></div>
          <h2 class="mt-5"> SIMILAR GAME </h2>
          <div class="row" id="similarGame"></div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export default PageDetail;
