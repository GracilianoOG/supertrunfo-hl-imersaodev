const botaoSorteia = document.querySelector(".sorteio");
const jogadorPrincipal = document.querySelector("#jogador");
const jogadorMaquina = document.querySelector("#maquina");

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

console.log(listaCartas);

botaoSorteia.addEventListener("click", () => {
    botaoSorteia.disabled = true;
    escolheCarta(sorteiaCarta(), jogadorPrincipal);
});

function sorteiaCarta() {
    return listaCartas[ Math.floor(Math.random() * listaCartas.length) ];
}

function escolheCarta(carta, jogador) {
    const jogadorTitulo = jogador.querySelector(".carta__titulo");
    const jogadorImagem = jogador.querySelector(".carta__imagem");
    jogadorTitulo.innerHTML = carta.nome;
    jogadorImagem.src = carta.imagem;
    geraCarta(carta, jogador);
}

function geraCarta(carta, jogador) {
    const jogadorAtributos = jogador.querySelector(".carta__atributos");
    for(let atributo in carta.atributos) {
        jogadorAtributos.innerHTML += 
        `
        <div class="atributo">
            <input class="atributo__input" type="radio" name="atributo" id="${atributo}">
            <label class="atributo__label" for="${atributo}">${atributo} <span class="atributo__valor">${carta.atributos[atributo]}</span></label>
        </div>
        `;
    }
    jogadorAtributos.children[0].children[0].checked = true;
}