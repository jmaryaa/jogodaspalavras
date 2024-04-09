const vogais = ['a', 'e', 'i', 'o', 'u'];
const consoantes = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

let letras = [];

let tentativasRestantes = 4;
let score = 0;

// Inicializar o jogo
function iniciarJogo() {
    // Limpar mensagens
    document.getElementById('mensagem').textContent = '';
    document.getElementById('palavras-possiveis').innerHTML = '';
    // Resetar tentativas e score
    tentativasRestantes = 4;
    score = 0;
    document.getElementById('tentativas').textContent = tentativasRestantes;
    document.getElementById('score').textContent = score;
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
    document.getElementById('letras').textContent = `Letras disponíveis: ${letras.join(' ')}`;
}

// Verificar palavra
function verificarPalavra() {
    const palavra = document.getElementById('palavra').value.toLowerCase();
    if (palavra.length < 3) {
        document.getElementById('mensagem').textContent = 'A palavra deve conter pelo menos 3 letras.';
        return;
    }
    if (letrasValidas(palavra)) {
        if (palavra.length > 6) {
            score += palavra.length * 2;
        } else {
            score += palavra.length;
        }
        document.getElementById('score').textContent = score;
        document.getElementById('mensagem').textContent = `Parabéns! Você formou a palavra '${palavra}' e ganhou ${palavra.length} ponto(s).`;
        document.getElementById('palavra').value = '';
        tentativasRestantes = 4;
        document.getElementById('tentativas').textContent = tentativasRestantes;
        iniciarJogo();
    } else {
        tentativasRestantes--;
        document.getElementById('tentativas').textContent = tentativasRestantes;
        if (tentativasRestantes === 0) {
            document.getElementById('mensagem').textContent = `Fim de Jogo! Suas tentativas acabaram.`;
            document.getElementById('palavra').setAttribute('disabled', 'disabled');
        } else {
            document.getElementById('mensagem').textContent = `Palavra inválida. Tente novamente!`;
        }
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

// Ver palavras possíveis
function verPalavrasPossiveis() {
    const palavrasPossiveis = [];
    for (let i = 0; i < letras.length; i++) {
        for (let j = i + 2; j <= letras.length; j++) {
            const palavra = letras.slice(i, j).join('');
            if (palavras.includes(palavra) && !palavrasPossiveis.includes(palavra)) {
                palavrasPossiveis.push(palavra);
            }
        }
    }
    const palavrasPossiveisHTML = palavrasPossiveis.map(palavra => `<span>${palavra}</span>`).join(', ');
    document.getElementById('palavras-possiveis').innerHTML = `Palavras Possíveis: ${palavrasPossiveisHTML}`;
}

// Iniciar o jogo ao carregar a página
window.onload = iniciarJogo;