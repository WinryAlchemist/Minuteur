//On récupère le bouton
const button = document.getElementById('button');
//On crée un variable temps globale pour l'interval
let globalTime = 0;
//On crée une variable pour savoir si c'est la première fois qu'on clique ou pas sur le boutton.
let used = false;

//On crée la fonction de conversion des secondes en timer plus lisible
const minutesSecondes = (time) => {
    //On déclare les variables utiles
    let heures = 0;
    let minutes = 0;
    let secondes = 0;

    //Si il y a plus d'une heure, on calcule les heures.
    if (time > 3600) {
        heures = Math.floor(time / 3600);
        minutes = Math.floor((time % 3600) / 60);
        secondes = time % 60;

        //Petit confort pour afficher un 0 devant les résultats à 1 digit pour en garder 2.
        if (secondes < 10) {
            secondes = '0' + secondes;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (heures < 10) {
            heures = '0' + heures;
        }

        //On retourne le texte formaté
        return heures + ' : ' + minutes + ' : ' + secondes;
    
    //Sinon si, il y a des minutes on calcule pas les heures mais les minutes
    } else if (time > 60) {
        minutes = Math.floor(time / 60);
        secondes = time % 60;

        //Petit confort pour afficher un 0 devant les résultats à 1 digit pour en garder 2.
        if (secondes < 10) {
            secondes = '0' + secondes;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        //On retourne le texte formaté
        return minutes + ' : ' + secondes;

    //Sinon, il ne reste que des secondes donc pas de calcul nessessaire.
    } else {
        //Petit confort pour afficher un 0 devant les résultats à 1 digit pour en garder 2.
        if (time < 10) {
            time = '0' + time;
        }

        return time;
    }
}

//On crée la fonction d'interval
const timeInterval = (time) => {
    globalTime -= 1;
    final.innerHTML = 'Temps restant : ' + minutesSecondes(globalTime);
}

//On crée la fonction de timer.
const timer = () => {
    //On récupère la balise audio
    const audio = document.getElementById('audio');
    //On récupère le paragraphe en dessous pour afficher le temps restant.
    const final = document.getElementById('final');

    //Si on reclique sur le boutton pour relancer un timer sans actualiser la page et avant que le précédent se soit terminé, on nettoie les intervals ici.
    if (used) {
        clearInterval(used);
    }

    //On récupère la valeur de l'input et on transforme en nombre
    let time = Number(document.getElementById('minutes').value);

    //on vérifie bien que le paramètre récupéré est un nombre
    if (typeof time === 'number') {
        //Converstion des minutes en milisecondes
        time *= 60000;

        //On dit qu'on démarre le timer
        globalTime = time / 1000;
        final.innerHTML = 'Temps restant : ' + minutesSecondes(globalTime);

        //On crée un interval pour afficher le temps restant et on change la variable used pour prévenir des bugs.
        const myInterval = setInterval(timeInterval, 1000);
        used = myInterval;

        //On démare le chargement de la musique
        audio.load();

        //On démare le timer
        setTimeout(() => {
            //On stoppe l'interval
            clearInterval(myInterval);
            //On lance l'audio
            audio.play();
            //Si la personne n'a pas entendu, on change aussi le contenu du form
            final.innerHTML = 'Le timer est fini !';
        }, time);

    } else {
        //Si la valeur n'est pas un nombre on change le texte du label afin de demander un nombre.
        document.getElementById('label').innerHTML = 'Veillez choisir un nombre pour que le minuteur fonctionne !'
    }
}


//Création de l'évènement
button.addEventListener('click', timer);