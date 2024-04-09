const vogais = ['a', 'e', 'i', 'o', 'u'];
const consoantes = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

const palavrasConhecidas = ["casa", "bola", "cachorro", "gato", "amor", "felicidade", "amigo", "família", "chuva", "sol", "vento", "lua", "estrela", "vida", "paz", "beleza"];

let letras = [];
let score = 0;
let nivel = 1;

// Inicializar o jogo
function iniciarJogo() {
    // Limpar mensagens
    document.getElementById('mensagem').textContent = '';
    document.getElementById('palavras-possiveis').innerHTML = '';
    // Gerar letras aleatórias
    letras = [];
    for (let i = 0; i < 20; i++) {
        if (i % 2 === 0) {
            letras.push(vogais[Math.floor(Math.random() * vogais.length)]);
        } else {
            letras.push(consoantes[Math.floor(Math.random() * consoantes.length)]);
        }
    }
    // Exibir letras
    const letrasDestaque = letras.map(letra => `<span>${letra}</span>`).join('');
    document.getElementById('letras').innerHTML = letrasDestaque;
}

// Verificar palavra
function verificarPalavra() {
    const palavra = document.getElementById('palavra').value.toLowerCase();
    if (palavra.length < 3) {
        document.getElementById('mensagem').textContent = 'A palavra deve conter pelo menos 3 letras.';
        return;
    }
    if (letrasValidas(palavra)) {
        const pontos = calcularScore(palavra);
        score += pontos;
        document.getElementById('score').textContent = score;
        document.getElementById('mensagem').textContent = `Parabéns! Você formou a palavra '${palavra}' e ganhou ${pontos} ponto(s).`;
        document.getElementById('palavra').value = '';
        if (score >= nivel * 100) {
            nivel++;
            iniciarJogo();
            document.getElementById('mensagem').textContent = `Parabéns! Você passou para o nível ${nivel}.`;
        }
    } else {
        document.getElementById('mensagem').textContent = `Palavra inválida. Tente novamente!`;
    }
}

// Verificar se a palavra é formada apenas por letras válidas
function letrasValidas(palavra) {
    const letrasDisponiveis = letras.slice(); // Copiar as letras disponíveis
    for (let letra of palavra) {
        const index = letrasDisponiveis.indexOf(letra);
        if (index === -1) {
            return false; // Letra não está disponível
        } else {
            letrasDisponiveis.splice(index, 1); // Remover letra das disponíveis
        }
    }
    return true; // Todas as letras da palavra estão disponíveis
}

// Calcular score da palavra
function calcularScore(palavra) {
    let pontos = 0;
    for (let letra of palavra) {
        pontos += letra.charCodeAt(0) - 96; // 'a' vale 1, 'b' vale 2, ...
    }
    return pontos;
}

// Ver palavras possíveis
function verPalavrasPossiveis() {
    const palavrasPossiveis = palavrasConhecidas.filter(palavra => letrasValidas(palavra));
    const palavrasPossiveisHTML = palavrasPossiveis.map(palavra => `<span>${palavra}</span>`).join(', ');
    document.getElementById('palavras-possiveis').innerHTML = `Palavras Possíveis: ${palavrasPossiveisHTML}`;
}

// Iniciar o jogo ao carregar a página
window.onload = iniciarJogo;