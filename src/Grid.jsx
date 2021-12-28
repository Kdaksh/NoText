import "./main.css";
import { useState } from "react";
import Confetti from 'react-confetti'
import win from './effects/success.mp3'
import click from './effects/click.mp3'
import tie from './effects/tie.mp3'
export default function Grid() {
    const [chance, setChance] = useState(1);
    
    const [girdValVH, setGridValVH] = useState([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
    ]);
    const [girdValD, setGridValD] = useState([
        [1, 5, 9],
        [3, 5, 7],
    ]);
    const [hovU, setHovU] = useState("");
    const gridValRep = (u, id) => {
      
        let arr1 = girdValVH;
        let arr2 = girdValD;
        arr1.map((e, i) => {
            e.map((ee, ii) => {
                if (ee == id) {
                    arr1[i][ii] = u;
                }
            });
        });
        arr2.map((e, i) => {
            e.map((ee, ii) => {
                if (ee == id) {
                    arr2[i][ii] = u;
                }
            });
        });
        setGridValVH(arr1);
        setGridValD(arr2);
        gameLogic(u);
    };
    let userChance = chance % 2 == 0 ? "circle" : "cross";

    let html =
        userChance === "cross"
            ? '<i class="fa fa-times ico"></i>'
            : '<i class="far fa-circle ico"></i>';

    
    const clickHandler = (e) => {
        let cellId = e.target.attributes[1].value;

        if (e.target.classList.contains("cell-empty")) {
            document.getElementById('click').play()
            e.target.classList.remove("hover");

            e.target.classList.remove(`${hovU}-hover`);
            e.target.innerHTML = html;
            e.target.classList.add(userChance);
            e.target.classList.remove("cell-empty");
            setChance(chance + 1);
            gridValRep(userChance, cellId);
        }
       
    };
    const gameLogic = (u) => {
        let arrs = [...girdValVH, ...girdValD];
        let won = false
       
        arrs.map((e, i) => {
            if (e[0] == u && e[1] == u && e[2] == u) {
                looseAnimation(u, i);
                disCell()
               

                document.getElementById('win_sound').play()
won = true
            
            }
            
        });
        if (!won) {
            if (document.getElementsByClassName('cell-empty').length === 0) {
                disCell()
                document.getElementById('tie').play()
                
               tieAnimation()
            }
        }
       
        
    };

    const tieAnimation = ()=>{
        
        let array = document.getElementsByClassName("cell");
       updateStatusBar(false,null)
      
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
           
                element.classList.add('dull')
                element.innerHTML = "";
                disCell()
            
        }
        setTimeout(()=>{reset()},15000)
    }
    
    const looseAnimation = (u, e) => {
        let winCases = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7],
        ];

       
        
       
        let array = document.getElementsByClassName("cell");
       
        document.getElementById('winner').style.display = 'block'
        updateStatusBar(true,((u==="cross")? "X" :"O"))
        setTimeout(()=>{reset()},15000)
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (winCases[e].includes(Number(element.attributes[1].value))) {
                element.classList.add('green')
               
                
            } else {
                element.classList.add('dull')
                element.innerHTML = "";
            }
        }
    };
const disCell = ()=>{
    let array = document.getElementsByClassName('cell')
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element.style.zIndex = '-1'
        
    }
}
const unDisCell = ()=>{
    let array = document.getElementsByClassName('cell')
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element.style.zIndex = '1'
        
    }
}
    const enter = (e) => {
        if (e.target.classList.contains("cell-empty")) {
            e.target.classList.add("hover");
            e.target.classList.add(`${userChance}-hover`);
            setHovU(userChance);
        } else {
            e.target.classList.remove("hover");

            e.target.classList.remove(`${hovU}-hover`);
        }
    };
    const out = (e) => {
        e.target.classList.remove("hover");

        e.target.classList.remove(`${hovU}-hover`);
    };
const reset = ()=>{
    // Reseting Hooks
    clearTimeout()
    setChance(1)
    setGridValVH([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
    ])
    setGridValD([
        [1, 5, 9],
        [3, 5, 7],
    ])
    setHovU('')
    document.getElementById('winner').style.display = 'none'
    resetStatusBar()
    let array = document.getElementsByClassName('cell')
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element.classList.remove('cell-empty')
        element.classList.add('cell-empty')
        element.innerHTML = ''
        element.classList.remove('circle')
        element.classList.remove('cross')
        element.classList.remove('dull')
        element.classList.remove('green')
        
        
    }
    unDisCell()
    unDisBtn()
}
const updateStatusBar = (s,u)=>{
    let bar = document.getElementById('statusBar')
        if (s) {
           bar.classList.add('green-win')
              bar.innerHTML = `Player ${u} Won`
        }
        else{
            bar.classList.add('stats')
            bar.innerHTML = `Its A Tie`
        }
}

const resetStatusBar = ()=>{
    let bar = document.getElementById('statusBar')
    bar.classList.remove('green-win')
    bar.classList.remove('dull')
    bar.classList.remove('stats')
    bar.innerHTML = 'Tic Tac Toe'


}
const unDisBtn = ()=>{
    document.getElementsByClassName('reset')[0].style.zIndex = '1'
}
    return (
        <>
        <div className="navbar" id="statusBar">
    Tic Tac Toe
        </div>
            <div className="grid">
                <div className="row">
                    <div
                        className="cell cell-empty "
                        onMouseEnter={enter}
                        onMouseLeave={out}
                        data-cell-id="1"
                        data-row-id="1"
                        data-diagonal-id="1"
                        onClick={clickHandler}
                    ></div>
                    <div
                        className="cell  cell-empty"
                        onMouseEnter={enter}
                        onMouseLeave={out}
                        data-cell-id="2"
                        data-row-id="1"
                        onClick={clickHandler}
                    ></div>
                    <div
                        className="cell  cell-empty"
                        onMouseEnter={enter}
                        onMouseLeave={out}
                        data-cell-id="3"
                        data-row-id="1"
                        onClick={clickHandler}
                        data-diagonal-id="2"
                    ></div>
                </div>
                <div className="row">
                    <div
                        className="cell  cell-empty "
                        onMouseEnter={enter}
                        onMouseLeave={out}
                        data-cell-id="4"
                        data-row-id="2"
                        onClick={clickHandler}
                    ></div>
                    <div
                        className="cell  cell-empty"
                        onMouseEnter={enter}
                        onMouseLeave={out}
                        data-cell-id="5"
                        data-row-id="2"
                        onClick={clickHandler}
                        data-diagonal-id="[1,2]"
                    ></div>
                    <div
                        className="cell  cell-empty"
                        onMouseEnter={enter}
                        onMouseLeave={out}
                        data-cell-id="6"
                        data-row-id="2"
                        onClick={clickHandler}
                    ></div>
                </div>
                <div className="row">
                    <div
                        className="cell  cell-empty"
                        onMouseEnter={enter}
                        onMouseLeave={out}
                        data-cell-id="7"
                        data-row-id="3"
                        onClick={clickHandler}
                        data-diagonal-id="2"
                    ></div>
                    <div
                        className="cell  cell-empty"
                        onMouseEnter={enter}
                        onMouseLeave={out}
                        data-cell-id="8"
                        data-row-id="3"
                        onClick={clickHandler}
                    ></div>
                    <div
                        className="cell cell-empty"
                        onMouseEnter={enter}
                        onMouseLeave={out}
                        data-cell-id="9"
                        data-row-id="3"
                        onClick={clickHandler}
                        data-diagonal-id="1"
                    ></div>
                </div>
            </div>
            <audio src={click} id="click"></audio>
            <audio src={tie} id="tie"></audio>
            <div className="row">
            <button className="reset" onClick={reset} ><i class="fas fa-redo"></i></button>
            </div>
            <audio src={win} id="win_sound"></audio>
           
            
            <Confetti id="winner" style={{display:'none'}} width={window.innerwidth} height={window.innerHeight}/>
        </>
    );
}
