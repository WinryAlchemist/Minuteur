//On récupère le bouton
const button = document.getElementById('button');
//On récupère l'audio
const audio = document.getElementById('audio');

//On crée la fonction de timer.
const timer = () => {
    //On récupère la valeur de l'input et on transforme en nombre
    let time = Number(document.getElementById('minutes').value);

    //on vérifie bien que le paramètre récupéré est un nombre
    if (typeof time === 'number') {
        //Converstion des minutes en milisecondes
        time *= 60000;

        //On démare le chargement de la musique
        audio.load();

        //On démare le timer
        setTimeout(() => {
            //On lance l'audio
            audio.play();
        }, time);

    } else {
        //Si la valeur n'est pas un nombre on change le texte du label afin de demander un nombre.
        document.getElementById('label').innerHTML = 'Veillez choisir un nombre pour que le minuteur fonctionne !'
    }
}


//Création de l'évènement
button.addEventListener('click', timer);