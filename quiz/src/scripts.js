const questions = [
    {
        title: "¿Cuál es el río más lago del mundo?",
        options:["Amazonas", "Nilo","Dnipro", "Tajo" ],
        answer: "0",
        img: "imagenes/cf.jpg",
        
    },
    {
        title: "¿Quién pintó la última cena?",
        options:["Leonardo Da Vinci", "Diego Velázquez","El Greco", "Matisse" ],
        answer:"0",
        img: "imagenes/cf.jpg"
    },
    {
        title: "¿Cuál es el país más grande del mundo?",
        options:["España", "Rusia", "China","Ucrania"],
        answer: "1",
        img: "imagenes/cf.jpg"
    },
    {
        title: "¿En qué año comenzó la Segunda Guerra Mundial?",
        options:["1945", "1987","1929", "1939" ],
        answer: "3",
        img: "imagenes/cf.jpg"
    },
    {
        title: "¿Cuántas patas tiene una araña?",
        options:["8", "2","6", "4" ],
        answer: "0",
        img: "imagenes/cf.jpg"
    },
    {
        title: "¿Cuál es la ciudad de los rasca cielos?",
        options:["Barcelona", "Cuenca","Las Palmas", "Nueva York" ],
        answer: "3",
        img: "imagenes/cf.jpg"
    },

];

const imgs = {
    heart:"imagenes/heart_icon.png",
    red_cross:"imagenes/red_cross.png",
    // game_over:"imagenes/game_over.jpg",
    game_over:"https://media.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif",
    green_tick:"imagenes/green_tick.png"

}


const MAX_NUM_LIFES = 0;
var currentQuestion; 
var currentLifes;

function onLoad(){    
    currentLifes = MAX_NUM_LIFES;
    currentQuestion = 0;
    loadGameSession(); 
    loadFirstQuestion(); 
}




function loadQuestion(questionId){
    console.log("questionID: "+questionId);
    const question = questions[questionId];
    
    var questionContent = document.getElementById("id_question");
    var answerContent = document.getElementById("id_answers");
    questionContent.innerHTML = "<h2>"+question.title+"</h2>";
    questionContent.innerHTML += "<img src='"+question.img +"'/>"

    var options = "";
    for (var i = 0; i < question.options.length; i++){        
        let value = question.options[i];       
        options += "<input type='radio' value='"+value + "' name='options' id='"+i+"'>";
        options += "<label>" + value +"</label>";
    }    
    // answerContent.innerHTML = options; 
    // options += "</ul>";
    answerContent.innerHTML = options;

}

function checkQuestionAnswer(questionId){
    const question = questions[questionId];
    var item = document.getElementById(question.answer);        
    return item.checked == true; 
}


function loadGameSession(){    
    var sessionInfo = document.getElementById("id_game_session");
    sessionInfo.innerHTML = ""; 
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    for (var i = 0; i<currentLives;i++){
        sessionInfo.innerHTML += "<img src='"+imgs.heart+"'/>"
    } 

    sessionInfo.innerHTML += "<h6>@Jugador: " +
         urlParams.get('name')+" @edad: "+ urlParams.get('user_age')+"</h6>";     
}


function onWrongQuestion(){
    var feedback = document.getElementById("id_question_feed");
    feedback.innerHTML = "<img src='imagenes/red_cross.png'/>";

    setTimeout(()=>{
        feedback.innerHTML = ""; 
        currentLifes--; 
        loadGameSession(); 
    },1000); 
    
}

function onCorrectAnswer(){
    var feedback = document.getElementById("id_question_feed");
    feedback.innerHTML = "<img src='"+imgs.green_tick+"'/>";

    setTimeout(()=>{
        feedback.innerHTML = ""; 
        currentQuestion++;
        loadQuestion(currentQuestion);    
    },1000); 
    
    
}

function loadFirstQuestion(){
    loadQuestion(currentQuestion);
}

function gameOver(){
    document.getElementsByTagName("body")[0].classList.toggle('body_game_over');
    var body = document.getElementsByClassName("main_question")[0];
    body.innerHTML = ""
    body.innerHTML = "<img src='"+imgs.game_over+"'/>";

    setTimeout(()=>{
        
        document.location = "index.html";
        
    },3500); 
    
}


function nextQuestion(){
    console.log("cq: "+currentQuestion);
    if (checkQuestionAnswer(currentQuestion)){
        onCorrectAnswer();        
    }
    else{
        if (currentLifes <= 0){
            gameOver(); 
        }else{
            onWrongQuestion();
        }
        
    }
    
}

function checkFields(){
    let name = document.getElementById('name');
    let age = document.getElementById('user_age');
    var result = false; 
    console.log(name.value);
    console.log(age.value);
    if (name.value.length > 0 && age.value.length > 0 ){
        result = true; 
    }else{
        alert ("Es necesario poner tu nombre y edad para jugar");
    }
    return result; 
}
