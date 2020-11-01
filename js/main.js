const typeWriter = function(txtElement,words,wait=1000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
}

//Type method
typeWriter.prototype.type = function(){
    //current index of word

    const current = this.wordIndex%this.words.length;

    //Get full text of current word

    const fullText  = this.words[current];

    //Check if deleting
    
    if (this.isDeleting) {

        //remove char

        this.txt = fullText.substring(0,this.txt.length-1);
    } else {

        //add char

        this.txt = fullText.substring(0,this.txt.length+1);
    }

    //insert txt into element

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    //type speed

    let typeSpeed = 100; //initial

    if(this.isDeleting){

        typeSpeed /=2;

    }

    //If word is complete

    if(!this.isDeleting && this.txt===fullText)
    {
        //pause at end

        typeSpeed = this.wait;
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt===''){
        this.isDeleting = false
        
        //move to next word

        this.wordIndex++;
        
        //pause before start typing

        typeSpeed = 500;
    }

    setTimeout(()=>this.type(),typeSpeed);
}

//Init on DOM load

document.addEventListener('DOMContentLoaded',init);

function init() {
    const txtElement = document.querySelector('.txt-type',);
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new typeWriter(txtElement,words,wait)
}