const botaoSorteia = document.querySelector("#sorteio");
const botaoIniciaJogo = document.querySelector("#jogo");
const jogadorPrincipal = document.querySelector("#jogador");
const jogadorMaquina = document.querySelector("#maquina");
const placar = document.querySelector(".placar__resultado");
let cartasAleatorias;

const listaCartas = [
    {
        nome: "Adrian Shephard",
        imagem: "",
        atributos: {
            attack: 8,
            defense: 7,
            science: 3,
            stealth: 5
        },
    },
    {
        nome: "Gordon Freeman",
        imagem: "",
        atributos: {
            attack: 6,
            defense: 7,
            science: 8,
            stealth: 3
        }
    }
];

botaoSorteia.addEventListener("click", () => {
    botaoSorteia.disabled = true;
    botaoIniciaJogo.style.display = "initial";
    cartasAleatorias = sorteiaParDeCartas();
    escolheCarta(cartasAleatorias[0], jogadorPrincipal);
    zeraCartaDoJogador(jogadorMaquina);
    placar.style.visibility = "hidden";
});

botaoIniciaJogo.addEventListener("click", () => {
    botaoSorteia.disabled = false;
    botaoIniciaJogo.style.display = "none";
    escolheCarta(cartasAleatorias[1], jogadorMaquina, false);
    comparaAtributos();
});

function sorteiaCarta() {
    return Math.floor(Math.random() * listaCartas.length);
}

function sorteiaParDeCartas() {
    let carta1 = sorteiaCarta();
    let carta2 = sorteiaCarta();

    while(carta1 == carta2) {
        carta2 = sorteiaCarta();
    }

    return [listaCartas[carta1], listaCartas[carta2]];
}

function escolheCarta(carta, jogador, geraInputs = true) {
    const jogadorTitulo = jogador.querySelector(".carta__titulo");
    const jogadorImagem = jogador.querySelector(".carta__imagem");
    jogadorTitulo.innerHTML = carta.nome;
    jogadorImagem.src = carta.imagem;
    geraCarta(carta, jogador, geraInputs);
}

function geraCarta(carta, jogador, geraInputs) {
    const jogadorAtributos = jogador.querySelector(".carta__atributos");
    jogadorAtributos.innerHTML = "";
    for(let atributo in carta.atributos) {
        if(geraInputs) {
            jogadorAtributos.innerHTML += 
            `
            <div class="atributo">
                <input class="atributo__input" type="radio" name="atributo" id="${atributo}">
                <label class="atributo__label" for="${atributo}">${atributo} <span class="atributo__valor">${carta.atributos[atributo]}</span></label>
            </div>
            `;
        } else {
            jogadorAtributos.innerHTML += 
            `
            <div class="atributo">
                <label class="atributo__label">${atributo} <span class="atributo__valor">${carta.atributos[atributo]}</span></label>
            </div>
            `;
        }
    }
    if(geraInputs) {
        jogadorAtributos.children[0].children[0].checked = true;
    }
}

function zeraCartaDoJogador(jogador) {
    jogador.children[0].innerHTML = "...";
    jogador.children[1].src = "";
    jogador.children[2].innerHTML = "";
}

function comparaAtributos() {
    const atributos = jogadorPrincipal.querySelectorAll(".atributo__input");
    
    for(let atributo of atributos) {
        if(atributo.checked) {
            const jogadorAtributo = cartasAleatorias[0].atributos[atributo.id];
            const maquinaAtributo = cartasAleatorias[1].atributos[atributo.id];

            if(jogadorAtributo > maquinaAtributo) {
                placar.innerHTML = "Jogador venceu!";
            } else if(maquinaAtributo > jogadorAtributo) {
                placar.innerHTML = "Jogador perdeu!";
            } else {
                placar.innerHTML = "Jogo empatado!";
            }
            placar.style.visibility = "visible";
            return;
        }
    }
}