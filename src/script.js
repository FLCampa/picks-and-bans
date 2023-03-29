$(document).ready(function () {
  const firstTeamName = "Fallen";
  const secondTeamName = "Campa";

  let teamPick = firstTeamName;

  let remainingMaps = ["CACHE", "COBBLESTONE", "INFERNO", "MIRAGE", "TRAIN"];

  const maps = $(".card");

  const teamTurnText = $("#teamPick");

  const changeTeamTurnInnerText = (t = 0) => {
    t === 0
      ? teamTurnText.html(`É a vez do time ${teamPick} banir o mapa`)
      : teamTurnText.html(`O mapa do jogo será ${t}`);
  };

  changeTeamTurnInnerText();

  const banMap = (event) => {
    event.target.removeEventListener("click", banMap);
    // vetado

    const bannedMap = event.currentTarget.querySelector(".map-name").innerText;
    remainingMaps = remainingMaps.filter((map) => map != bannedMap);

    console.log(remainingMaps);

    if (remainingMaps.length === 1) {
      const choosenMap = document.querySelector(".card:not(.selected)");
      choosenMap.removeEventListener("click", banMap);
      choosenMap.classList.add("picked", "disable-hover");

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
