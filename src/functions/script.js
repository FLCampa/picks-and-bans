document.addEventListener("DOMContentLoaded", async function () {
  let promptInput = document.querySelector(".prompt-input");

  promptInput.addEventListener("keydown", async function (event) {
    if (event.code === "Enter") {
      document.querySelector(".prompt-button").click();
    }
  });

  const customPrompt = (text) => {
    document.querySelector(".custom-prompt").style.visibility = "visible";
    document.querySelector(".prompt-text").innerText = text;

    return new Promise((resolve) => {
      document.querySelector(".prompt-button").onclick = () => {
        resolve(document.querySelector(".prompt-input").value);

        document.querySelector(".prompt-input").value = "";
        document.querySelector(".custom-prompt").style.visibility = "hidden";
      };
    });
  };

  const firstTeamNameInput = await customPrompt("Nome do primeiro time");
  const secondTeamNameInput = await customPrompt("Nome do segundo time");

  const firstTeamName = firstTeamNameInput
    ? (document.querySelector("#first-team-name").innerHTML =
        firstTeamNameInput)
    : "1";

  const secondTeamName = secondTeamNameInput
    ? (document.querySelector("#second-team-name").innerHTML =
        secondTeamNameInput)
    : "2";

  let section = document.querySelector("section");
  section.innerHTML = `
    <hr />
      <h2 id="team-turn-text" style="padding: 0 18px;">
        É a vez do time banir o mapa
      </h2>
    <hr />
  `;

  let teamTurn = firstTeamName;

  let remainingMaps = ["CACHE", "COBBLESTONE", "INFERNO", "MIRAGE", "TRAIN"];

  const mapCards = document.querySelectorAll("article");

  const teamTurnText = document.querySelector("#team-turn-text");

  const changeTeamTurnInnerText = (choosenMap = null) => {
    !choosenMap
      ? (teamTurnText.innerText = `É a vez do time ${teamTurn} banir o mapa`)
      : (teamTurnText.innerHTML = `O mapa do jogo será ${choosenMap}`);
  };

  changeTeamTurnInnerText();

  const banMap = (event) => {
    event.currentTarget.removeEventListener("click", banMap);

    event.currentTarget.classList.add("selected");
    event.currentTarget.querySelector("div > span").innerText = "Banido";

    const bannedMap = event.currentTarget.querySelector("h3").innerText;
    remainingMaps = remainingMaps.filter((map) => map != bannedMap);

    if (remainingMaps.length === 1) {
      const choosenMap = document.querySelector("article:not(.selected)");
      choosenMap.removeEventListener("click", banMap);
      choosenMap.classList.add("picked");

      changeTeamTurnInnerText(remainingMaps[0]);

      return;
    }

    teamTurn = teamTurn === firstTeamName ? secondTeamName : firstTeamName;

    changeTeamTurnInnerText();
  };

  mapCards.forEach((map) => map.addEventListener("click", banMap));
});
