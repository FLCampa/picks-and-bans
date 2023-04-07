document.addEventListener("DOMContentLoaded", function () {
  const firstTeamName = "Campa";
  const secondTeamName = "Fallen";

  let teamTurn = firstTeamName;

  let remainingMaps = ["CACHE", "COBBLESTONE", "INFERNO", "MIRAGE", "TRAIN"];

  const maps = document.querySelectorAll(".card-container");

  const teamTurnText = document.querySelector("#teamPick");

  const changeTeamTurnInnerText = (t = 0) => {
    t === 0
      ? (teamTurnText.innerText = `É a vez do time ${teamTurn} banir o mapa`)
      : (teamTurnText.innerHTML = `O mapa do jogo será ${t}`);
  };

  changeTeamTurnInnerText();

  const banMap = (event) => {
    event.currentTarget.removeEventListener("click", banMap);

    event.currentTarget.classList.add("selected");
    event.currentTarget.querySelector("dl").innerText = "Banido";

    const bannedMap = event.currentTarget.querySelector(".map-name").innerText;
    remainingMaps = remainingMaps.filter((map) => map != bannedMap);

    if (remainingMaps.length === 1) {
      const choosenMap = document.querySelector(
        ".card-container:not(.selected)"
      );
      choosenMap.removeEventListener("click", banMap);
      choosenMap.classList.add("picked");

      changeTeamTurnInnerText(remainingMaps[0]);

      return;
    }

    teamTurn = teamTurn === firstTeamName ? secondTeamName : firstTeamName;

    changeTeamTurnInnerText();
  };

  maps.forEach((map) => map.addEventListener("click", banMap));
});
