$(document).ready(function () {
  const firstTeamName = "Fallen";
  const secondTeamName = "Campa";

  let teamPick = firstTeamName;

  let remainingMaps = ["CACHE", "COBBLESTONE", "INFERNO", "MIRAGE", "TRAIN"];

  const maps = $(".card-container");

  const teamTurnText = $("#teamPick");

  const changeTeamTurnInnerText = (t = 0) => {
    t === 0
      ? teamTurnText.html(`É a vez do time ${teamPick} banir o mapa`)
      : teamTurnText.html(`O mapa do jogo será ${t}`);
  };

  changeTeamTurnInnerText();

  const banMap = (event) => {
    console.log(event.currentTarget);

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
      choosenMap.classList.add("picked", "disable-hover");

      console.log(event.currentTarget.parentNode);

      changeTeamTurnInnerText(remainingMaps[0]);

      return;
    }

    teamPick = teamPick === firstTeamName ? secondTeamName : firstTeamName;

    changeTeamTurnInnerText();
  };

  for (let index = 0; index < maps.length; index++) {
    maps[index].addEventListener("click", banMap);
  }
});
