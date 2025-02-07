let box = document.querySelectorAll('.box')
let dline = document.querySelector('#diagonal_line')
let sline = document.querySelector('#straight_line')

function Gameover(){    //returns true if all box are filled
    const boxes = document.querySelectorAll('.box');
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerHTML.trim() === '') {
            return false; 
        }
    }
    return true;
}

function reset_board(){    //reset the game
    resetbtn = document.querySelector('.btn')
    resetbtn.addEventListener('click',()=>{
        box.forEach((e)=>{
            e.innerHTML = '';
            e.className = 'box unused'
        })
        sline.style.backgroundColor = 'transparent'
        dline.style.backgroundColor = 'transparent'
        msgbox.innerHTML = `Player X's turn`
        firstChance=1
        gameEnded=false
        document.getElementById('modeBox').style.display = 'flex'

        main() 
    })
}

function animation(element,angle,y,x){
    sline.style.left = `${x}%`;
    gsap.to(element,{
        rotate:angle,
        yPercent:y,
        duration:0.3,
        backgroundColor:'blueviolet',
    })
    gsap.from(element,{
        opacity:0
    })
}


function line(a,b,c){
    if(a==0 && b==1 && c==2){
        animation(sline,90,-42,49)
    }
    else if(a==3 && b==4 && c==5){
        animation(sline,90,0,49)
    }
    else if(a==6 && b==7 && c==8){
        animation(sline,90,42,49)
    }
    else if(a==0 && b==3 && c==6){
        animation(sline,0,0,16.5)
    }
    else if(a==1 && b==4 && c==7){
        animation(sline,0,0,50)
    }
    else if(a==2 && b==5 && c==8){
        animation(sline,0,0,83)
    }
    else if(a==0 && b==4 && c==8){
        animation(dline,135,0,0)
    }
    else{
        animation(dline,46,0,0)
    }
}

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkresult(symbol){           
    for(i=0;i<winningConditions.length;i++){
        const [a,b,c] = winningConditions[i]
        if(box[a].classList.contains(symbol) && box[b].classList.contains(symbol) && box[c].classList.contains(symbol)){
            msgbox.innerHTML = `Player ${symbol[0].toUpperCase()} Won`
            resetbtn = document.querySelector('#resetbtn')
            line(a,b,c)
            xcount=1
            ycount=1
            return true
        }
    }
    return false
}

function check(symbol){
    if(checkresult(symbol)==true){
        gameEnded=true
        main()
    }
    else if(Gameover()==true){
        msgbox.innerHTML = `Game Over. Click RESET to Play`
        gameEnded=true
        main()
    }
}

function Normal_handleChances(e){
    document.getElementById('modeBox').style.display = 'none'
    target = e.target
    firstChance=false
    X='<i class="fa-solid fa-xmark"></i>'
    O='<i class="fa-regular fa-circle"></i>'
    var previous = document.querySelector('.previous')
    var msgbox = document.querySelector('#msgbox')
    
    if(target.classList.contains('unused')===true){
        if(previous==null){
            target.innerHTML = X
            target.classList.add('previous','xblock')
            target.classList.remove('unused')
            msgbox.innerHTML = 'Player Y\'s turn'
            check('xblock')
        }
        else{
            if(previous.classList.contains('xblock')){
                target.innerHTML = O
                target.classList.remove('unused')
                previous.classList.remove('previous')
                target.classList.add('previous','yblock')
                msgbox.innerHTML = 'Player X\'s turn'
                check('yblock')
            }
            else{
                target.innerHTML = X
                target.classList.remove('unused')
                previous.classList.remove('previous')
                target.classList.add('previous','xblock')
                msgbox.innerHTML = 'Player Y\'s turn'
                check('xblock')
            }
        }      
    }
    else{
        console.log('occupied')
    }
}


xcount=1
ycount=1

function compare(s1,s2){
    let a  = parseInt(s1.slice(1))
    let b  = parseInt(s2.slice(1))
    return a>=b ?true:false
}

function Infinite_handleChances(e){
    document.getElementById('modeBox').style.display = 'none'
    target = e.target
    firstChance=false
    X='<i class="fa-solid fa-xmark"></i>'
    O='<i class="fa-regular fa-circle"></i>'
    var previous = document.querySelector('.previous')
    var msgbox = document.querySelector('#msgbox')

    if(target.classList.contains('unused')===true){
        if(previous==null){
            target.innerHTML = X
            target.classList.remove('unused')
            target.classList.add('previous','xblock',`x${xcount++}`)
            msgbox.innerHTML = 'Player Y\'s turn'
            check('xblock')
        }
        else{
            if(previous.classList.contains('xblock')){
                if(compare(`y${ycount}`,'y3')){

                    xtail = document.querySelector(`.x${xcount-3} i`)
                    xtail.style.backgroundColor = 'pink'
                }
                if(compare(`y${ycount}`,'y4')){

                    ytail = document.querySelector(`.y${ycount-3}`)
                    ytail.classList.remove(`y${ycount-3}`,'yblock')
                    ytail.classList.add('unused')
                    ytail.innerHTML = ''
                }
                target.innerHTML = O
                previous.classList.remove('previous')
                target.classList.remove('unused')
                target.classList.add('previous','yblock',`y${ycount++}`)
                msgbox.innerHTML = 'Player X\'s turn'
                check('yblock')
            }
            else{
                if(compare(`x${ycount}`,'x4')){

                    ytail = document.querySelector(`.y${ycount-3} i`)
                    ytail.style.backgroundColor = 'pink'
                }
                if(compare(`x${xcount}`,'x4')){

                    xtail = document.querySelector(`.x${xcount-3}`)
                    xtail.classList.remove(`x${xcount-3}`,'xblock')
                    xtail.classList.add('unused')
                    xtail.innerHTML = ''
                }
                target.innerHTML = X
                previous.classList.remove('previous')
                target.classList.remove('unused')
                target.classList.add('previous','xblock',`x${xcount++}`)
                msgbox.innerHTML = 'Player Y\'s turn'
                check('xblock')
            }
        }      
    }
    else{
        console.log('occupied')
    }
}


let firstChance = true;
let gameEnded = false;
let normalMode = document.querySelector('#normal')
let infiniteMode = document.querySelector('#infinite')

function main(){
    if((Gameover()==false || firstChance==true) && gameEnded==false){
        box.forEach((e)=>{
            if(infiniteMode.checked){
                e.removeEventListener('click',Normal_handleChances)
                e.addEventListener('click',Infinite_handleChances)
            }
            else{
                e.removeEventListener('click',Infinite_handleChances)
                e.addEventListener('click',Normal_handleChances)
            }
        })
    }
    else{
        box.forEach((e)=>{
            if(infiniteMode.checked){
                e.removeEventListener('click',Infinite_handleChances)
            }
            else{
                e.removeEventListener('click',Normal_handleChances)
            }
        })
    }
}

main()
reset_board()

infiniteMode.addEventListener('click',()=>{
    main()
})
normal.addEventListener('click',()=>{
    main()
})

