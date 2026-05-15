// Cette liste nous permettra de connaitre les noms de cam déjà existant 
let ListeCamera = []
// Gestion de la page pop-up
const page = document.querySelector('.pop-up')
const bouton = document.querySelector('.ajouter')
// Afficher ou pas la page pop-up 
bouton.addEventListener('click',()=>{
    page.style.visibility = 'visible';
    document.getElementsByName('name')[0].focus()
})
page.addEventListener('click',(e)=>{
    if (e.target===page){
    page.style.visibility = 'hidden'
    reset()
}
})

// NB: Fermer la fenêtre agrandir grâce au bouton 

function FermerAgrandir(){
    const selection = document.querySelector('.agrandir').getElementsByClassName('camera-frame')[0]
    if (selection){
    document.querySelector('.center').prepend(selection)
    selection.style.minHeight='70vh'}
    document.querySelector('.agrandir').style.visibility='hidden'
    selection.getElementsByClassName('entrer')[0].style.visibility = 'visible'
    
}
// Ici, le bindage de l'évèvenement sur la bouton close 
document.querySelector('.close').addEventListener('click',FermerAgrandir)

//Gestion de la validation du bouton valider

const texte1 = document.getElementsByName('name')[0]

const texte2 = document.getElementsByName('url')[0]

texte1.addEventListener('keydown',(e)=>{
    
    if (e.key==='Enter'){
        texte2.focus()
    }
})

function estunlien(url){
    try{
    const a = new URL(url)
    return true;}
    catch(e){
        console.log(e)
        return false;
    }
}

function reset(){
    // Cette fonction va nous permettre de réintialiser les inputs 
    texte1.value = ''
    texte2.value = ''
    document.querySelector('.info').textContent=''
}

function valider(){
    
    const label = document.querySelector('.info')
    if (!(texte1.value && texte2.value)){
        label.textContent = 'Remplissez le formulaire'
        return false;
    }
    else if(!estunlien(texte2.value)){
        console.log(texte2.value)
        label.textContent = "Url non valide"
        return false;
    }
    else if(ListeCamera.includes(texte1.value)){
        label.textContent = 'Nom déjà pris'
        return false
    }
    else{
        ListeCamera.push(texte1.value)
        return true;
    }
}


function afficher(name,url){
    page.style.visibility = 'hidden'
    const ListeCam = document.querySelector('.left')
    const central = document.querySelector('.center')
    const nouveau = document.createElement('div')
    nouveau.classList.add('frame-name')
    nouveau.textContent = name 
    document.querySelector('.ajouter').before(nouveau)
    //Ici, on va afficher la frame de la caméra 
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const imgnew = document.createElement('img')
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    const spannew = document.createElement('span')
    
    div1.classList.add('camera-frame')
    imgnew.classList.add('source')
    imgnew.src=url
    div2.classList.add('options')
    button1.classList.add('entrer', 'bouton')
    button1.textContent = 'Voir'
    spannew.classList.add('nom-room')
    spannew.textContent=name
    button2.classList.add('fermer' ,'bouton')
    button2.textContent = 'Fermer'

    // ajouter les éléments au dom 

    central.append(div1)
    div1.append(imgnew)
    div1.append(div2)
    div2.append(button1)
    div2.append(spannew)
    div2.append(button2)
    // Fonction du bouton entrer
    button1.addEventListener('click',()=>{
        const newpage = document.querySelector('.agrandir')
        newpage.style.visibility='visible'
        newpage.prepend(div1)
        div1.style.minHeight='98vh'
        button1.style.visibility = 'hidden'
    })
    // Fonction du bouton fermer 
    button2.addEventListener('click',()=>{
        ListeCamera = ListeCamera.filter(i=> i !==nouveau.textContent)
        imgnew.src=''
        div1.remove()
        nouveau.remove()
        }
    )
    // Fonction du bouton name affichant le nom de la cam 
    nouveau.addEventListener('click',()=>{
        const newpage = document.querySelector('.agrandir')
        newpage.style.visibility='visible'
        newpage.prepend(div1)
        div1.style.minHeight='98vh'
        button1.style.visibility = 'hidden'
    })

    // Réintialisation 
    reset()
}

function EnvoyerRoom(){
    // Cette fonction va nous permettre d'envoyer le nom et le lien au serveur
}

texte2.addEventListener('keydown',(e)=>{
    if (e.key==='Enter'){
        if(valider()){
            afficher(texte1.value,texte2.value)

        }
    }
})
document.querySelector('.confirmer').addEventListener('click',()=>{
    if(valider()){
            afficher(texte1.value,texte2.value)
        }
})