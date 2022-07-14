const highSeason = document.getElementById('high_season');
const middleSeason = document.getElementById('middle_season');
const lowSeason = document.getElementById('low_season');

const leftPrice = document.getElementById('left_price');
const centerPrice = document.getElementById('center_price');
const rightPrice = document.getElementById('right_price');

middleSeason.addEventListener("click", () => {
    highSeason.classList.remove('season_active');
    lowSeason.classList.remove('season_active');
    middleSeason.classList.add('season_active');

    leftPrice.innerText = "109";
    centerPrice.innerText = '189';
    rightPrice.innerText = '269';
});
lowSeason.addEventListener("click", () => {
    highSeason.classList.remove('season_active');
    middleSeason.classList.remove('season_active');
    lowSeason.classList.add('season_active');

    leftPrice.innerText = "99";
    centerPrice.innerText = '169';
    rightPrice.innerText = '249';
});
highSeason.addEventListener("click", () => {
    middleSeason.classList.remove('season_active');
    lowSeason.classList.remove('season_active');
    highSeason.classList.add('season_active');

    leftPrice.innerText = "129";
    centerPrice.innerText = '209';
    rightPrice.innerText = '309';
});