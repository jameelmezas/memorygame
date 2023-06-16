// paar dingen te pakken
const section = document.querySelector('section');
const playerLivesCount = document.querySelector("span");
let playerLives = 8;

//Text linken
playerLivesCount.textContent = playerLives;

//gegevens instellen
const getData = () =>  [
    { imgSrc: "images/bellingham.jpg", name: "bellingham" },
    { imgSrc: "images/benzema.jpg", name: "benzema" },
    { imgSrc: "images/marcelo.jpg", name: "marcelo" },
    { imgSrc: "images/mbappe.jpg", name: "mbappe" },
    { imgSrc: "images/messi.jpg", name: "messi" },
    { imgSrc: "images/neymar.jpg", name: "neymar" },
    { imgSrc: "images/ramos.jpg", name: "ramos" },
    { imgSrc: "images/ronaldo.jpg", name: "ronaldo" },
    { imgSrc: "images/bellingham.jpg", name: "bellingham" },
    { imgSrc: "images/benzema.jpg", name: "benzema" },
    { imgSrc: "images/marcelo.jpg", name: "marcelo" },
    { imgSrc: "images/mbappe.jpg", name: "mbappe" },
    { imgSrc: "images/messi.jpg", name: "messi" },
    { imgSrc: "images/neymar.jpg", name: "neymar" },
    { imgSrc: "images/ramos.jpg", name: "ramos" },
    { imgSrc: "images/ronaldo.jpg", name: "ronaldo" },
];

//Random maken
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

//Card instel functie
const cardGenerator = () => {
   const cardData = randomize();
   //HTMl instellen
   cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Bevestig de info op de cards
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);
    //de kaarten bevestigen aan de section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
        card.classList.toggle('toggleCard');
        checkCards(e);
    });
   });
 };
 //check de cards
 const checkCards = (e) => {
    console.log(e)
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll(".toggleCard");
    if(flippedCards.length === 2){
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            })
        } else{
            console.log("wrong");
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart("Try again!!!");
            }
        }
    }
    //checken of we de game hebben gewonnen
    if (toggleCard.length === 16){
        restart("You won!!!");
    }
 };

 //Restart
 const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item,index) => {
        cards[index].classList.remove("toggleCard");
        //Randomize
     setTimeout(() => {
        cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);
        section.style.pointerEvents = "all";
     },1000);

    });
    playerLives = 8;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
 };

cardGenerator();