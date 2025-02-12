const id=localStorage.getItem("setDomande");
let questions=[];
let countDomanda=0;
let answered=false;
let answers={};
const titolo=document.getElementById("title"); //Titolo domanda
const d1=document.getElementById("textR1");
const d2=document.getElementById("textR2"); //Testi risposte
const d3=document.getElementById("textR3");
const d4=document.getElementById("textR4");
const result=document.getElementById("resultAnswer");
const answerButton=document.getElementById("answerButton");
if(id==1) { //Logica
  questions=[
        {
          "titolo": "In un armadio ci sono 7 maglioni (2 blu, 3 rossi e 2 gialli) e 3 magliette (2 blu e 1 rossa). Prendendo prima un maglione e poi una maglietta, qual è la probabilità che siano entrambi blu?",
          "risposta1": "4/10",
          "risposta2": "2/21",
          "risposta3": "20/21",
          "risposta4": "4/21",
          "rispostaCorretta": "2/21"
        },
        {
          "titolo": "Una vasca è lunga 10m e larga 5m. Se in un metro cubo si possono collocare 21,6 casse, quanto dovrà essere alta la vasca per contenere 4320 casse?",
          "risposta1": "2,40 m",
          "risposta2": "3,60 m",
          "risposta3": "4,00 m",
          "risposta4": "4,50 m",
          "rispostaCorretta": "3,60 m"
        },
        {
          "titolo": "In teoria degli insiemi, sono definite le \"operazioni\" di unione ∪, di intersezione ∩ e di esclusione (il corrispettivo della sottrazione). Inoltre, è definito l'insieme vuoto ∅ che contiene 0 elementi. La parte colorata nel seguente diagramma corrisponde a:",
          "risposta1": "(A ∩ B)/(A ∩ B ∩ C) ∪ [(A ∩ (C/B)) / (A ∩ C ∩ D)]",
          "risposta2": "(B ∪ C ∪ D) ∩ [(A/C) ∪ (D / (C ∩ A ∩ D))]",
          "risposta3": "[(A ∩ B ∩ C) ∪ D] ∩ A ∪ (C / (B ∪ D)) ∪ (B/A)",
          "risposta4": "(A ∩ B)/(A ∩ B ∩ C) ∩ ∅ ∩ [(A ∩ (C/B)) / (A ∩ C ∩ D)]",
          "rispostaCorretta": "(A ∩ B)/(A ∩ B ∩ C) ∪ [(A ∩ (C/B)) / (A ∩ C ∩ D)]"
        },
        {
          "titolo": "Quali sono i valori x e y che completano la seguente serie numerica? 1, 1, 4, 8, x, 27, 16, 64, 25, y",
          "risposta1": "x = 3, y = 100",
          "risposta2": "x = 9, y = 125",
          "risposta3": "x = 3, y = 125",
          "risposta4": "x = 9, y = 100",
          "rispostaCorretta": "x = 9, y = 125"
        },
        {
          "titolo": "Tutti i corridori sono tenaci; nessuna persona tenace è superba. Significa che:",
          "risposta1": "Alcuni superbi sono tenaci",
          "risposta2": "Nessun corridore è tenace",
          "risposta3": "Nessun corridore è superbo",
          "risposta4": "Alcuni superbi sono corridori",
          "rispostaCorretta": "Nessun corridore è superbo"
        },
        {
          "titolo": "Sull'isola di Smullyan vivono solo cavalieri, che dicono sempre e solo la verità, e furfanti, che mentono sempre. Sull'isola si tiene una riunione, e tutti i partecipanti si siedono intorno a un grande tavolo rotondo e dichiarano: \"La persona alla mia sinistra è un furfante\". Sapendo che i cavalieri sono meno di 200, quanti possono essere in tutto i partecipanti alla riunione?",
          "risposta1": "370",
          "risposta2": "460",
          "risposta3": "393",
          "risposta4": "407",
          "rispostaCorretta": "407"
        },
        {
          "titolo": "Il servizio di pullman tra Palera e Revigliasco ha una corsa diretta che parte ogni 12 minuti da ciascuna delle due città. Il servizio ha inizio contemporaneamente in entrambe le città. Il tragitto richiede 1 ora e 5 minuti in ciascuna direzione e gli autobus sostano per almeno 5 minuti presso la stazione di arrivo. Qual è il numero minimo di autobus necessari per fornire il servizio, considerando sia l'andata sia il ritorno?",
          "risposta1": "4",
          "risposta2": "6",
          "risposta3": "12",
          "risposta4": "14",
          "rispostaCorretta": "6"
        },
        {
          "titolo": "Per numerare le pagine di un libro sono state usate in totale 3299 cifre. Quante sono le pagine del libro?",
          "risposta1": "Tra 1000 e 1500",
          "risposta2": "Più di 3000",
          "risposta3": "Tra 1500 e 2000",
          "risposta4": "Tra 2000 e 3000",
          "rispostaCorretta": "Tra 2000 e 3000"
        },
        {
          "titolo": "Silvia abita tra la chiesa e il distributore. La chiesa si trova tra il distributore e il panificio. Si può affermare che:",
          "risposta1": "Silvia abita più vicino alla chiesa che al panificio",
          "risposta2": "È certo che il distributore e il panificio sono equidistanti dalla chiesa",
          "risposta3": "Silvia abita più vicino al distributore che alla chiesa",
          "risposta4": "Silvia abita più vicino al panificio che alla chiesa",
          "rispostaCorretta": "Silvia abita più vicino alla chiesa che al panificio"
        },
        {
          "titolo": "Degli archeologi ritrovano un frammento di un piatto circolare come in figura, e vi chiedono di capire quanto fosse lungo il raggio del piatto intero. Sapendo che P è il punto medio del segmento AB e Q è il punto medio dell'arco AB, e che il segmento AB misura 50 cm e PQ misura 5 cm, quanto misurava il raggio del piatto?",
          "risposta1": "60 cm",
          "risposta2": "52 cm",
          "risposta3": "72 cm",
          "risposta4": "65 cm",
          "rispostaCorretta": "60 cm"
        }            
    ];
}

showDomanda();

function showDomanda() {
  result.style.display="none";
  if(questions.length==0) {
    answerButton.style.display="none";
    d1.innerHTML="Non ancora disponibile";
    return;
  }
  else if(countDomanda==questions.length) {
    d1.innerHTML="";
    d2.innerHTML="";
    d3.innerHTML="";
    d4.innerHTML="";
    answerButton.style.display="none";
    titolo.textContent="Quiz terminato, torna pure alla home";
    return;
  }
  titolo.textContent=(countDomanda+1)+". "+questions[countDomanda].titolo;
  d1.innerHTML='<input type="radio" id="risposta1" name="risposta">'+questions[countDomanda].risposta1;
  d2.innerHTML='<input type="radio" id="risposta2" name="risposta">'+questions[countDomanda].risposta2;
  d3.innerHTML='<input type="radio" id="risposta3" name="risposta">'+questions[countDomanda].risposta3;
  d4.innerHTML='<input type="radio" id="risposta4" name="risposta">'+questions[countDomanda].risposta4;
}

function getChecked() {
  if(document.getElementById("risposta1").checked) return questions[countDomanda].risposta1;
  else if(document.getElementById("risposta2").checked) return questions[countDomanda].risposta2;
  else if(document.getElementById("risposta3").checked) return questions[countDomanda].risposta3;
  else if(document.getElementById("risposta4").checked) return questions[countDomanda].risposta4;
  else return "";
}

function answer() {
  if(answered) {
    answered=false;
    countDomanda++;
    answerButton.innerText="Rispondi";
    showDomanda();
    return;
  }
  result.style.display="flex";
  if(getChecked()==questions[countDomanda].rispostaCorretta) {
    answered=true;
    result.style.color="green";
    result.innerText="✅Risposta corretta";
    answerButton.innerText="Passa alla prossima domanda";
  }
  else if(getChecked()=="") result.innerText="Non hai selezionato nessuna risposta";
  else {
    result.style.color="red";
    result.innerText="❌Risposta errata";
  }
}

function goHome() {
  window.location="index.html";
}