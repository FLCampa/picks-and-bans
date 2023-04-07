document.addEventListener("DOMContentLoaded", function () {
  const firstTeamName = "Campa";
  const secondTeamName = "Fallen";

  document.querySelector("#firstTeamName").innerHTML = firstTeamName;
  document.querySelector("#secondTeamName").innerHTML = secondTeamName;

  let teamTurn = firstTeamName;

  let remainingMaps = ["CACHE", "COBBLESTONE", "INFERNO", "MIRAGE", "TRAIN"];

  const mapCards = document.querySelectorAll("article");

  const teamTurnText = document.querySelector("#teamTurnText");

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
