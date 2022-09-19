const botaoSorteia = document.querySelector("#sorteio");
const botaoIniciaJogo = document.querySelector("#jogo");
const jogadorPrincipal = document.querySelector("#jogador");
const jogadorMaquina = document.querySelector("#maquina");
const placar = document.querySelector(".placar__resultado");
let cartasAleatorias;

const listaCartas = [
    {
        nome: "Adrian Shephard",
        imagem: "https://steamuserimages-a.akamaihd.net/ugc/918046427871732717/0B8D7FD64C9486F4DC58BE296DA0E7AFEA43DFA9/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
        atributos: {
            ataque: 7,
            defesa: 6,
            conhecimento: 3,
            furtividade: 5
        },
    },
    {
        nome: "Gordon Freeman",
        imagem: "https://wallup.net/wp-content/uploads/2019/09/2823-half-life-2-gordon-freeman.jpg",
        atributos: {
            ataque: 6,
            defesa: 7,
            conhecimento: 8,
            furtividade: 3
        }
    },
    {
        nome: "Barney Calhoun",
        imagem: "https://steamuserimages-a.akamaihd.net/ugc/281856448673383569/390C1F8D24DE209339E6908A59DC0C064F2F2058/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
        atributos: {
            ataque: 5,
            defesa: 4,
            conhecimento: 5,
            furtividade: 6
        }
    },
    {
        nome: "Gargantua",
        imagem: "https://images.gamebanana.com/img/ss/mods/60e74a3ccb722.jpg",
        atributos: {
            ataque: 10,
            defesa: 9,
            conhecimento: 2,
            furtividade: 1
        }
    },
    {
        nome: "Zombie",
        imagem: "https://media.moddb.com/images/mods/1/13/12792/zombie01.png",
        atributos: {
            ataque: 8,
            defesa: 3,
            conhecimento: 1,
            furtividade: 2
        }
    },
    {
        nome: "Bullsquid",
        imagem: "https://cdna.artstation.com/p/assets/covers/images/013/586/302/large/a-dawson-img-20181019-071726-228.jpg?1540287677",
        atributos: {
            ataque: 8,
            defesa: 5,
            conhecimento: 1,
            furtividade: 1
        }
    },
    {
        nome: "Scientist",
        imagem: "https://i.ytimg.com/vi/zVYJ9o6Bddo/maxresdefault.jpg",
        atributos: {
            ataque: 2,
            defesa: 3,
            conhecimento: 10,
            furtividade: 4
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