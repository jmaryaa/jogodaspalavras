// Lista de palavras possíveis
const palavras = ["python", "javascript", "html", "css", "programacao", "desenvolvimento", "computador", "internet", "teclado", "mouse"];

// Letras aleatórias
function letrasAleatorias() {
    let letras = '';
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 10; i++) {
        letras += alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
    }
    return letras;
}

let tentativasRestantes = 4;

// Inicializar o jogo
function iniciarJogo() {
    document.getElementById('letras').textContent = `Letras disponíveis: ${letrasAleatorias()}`;
    document.getElementById('tentativas').textContent = tentativasRestantes;
}

// Verificar palavra
function verificarPalavra() {
    const palavra = document.getElementById('palavra').value.toLowerCase();
    if (palavras.includes(palavra)) {
        const score = calcularScore(palavra);
        document.getElementById('mensagem').textContent = `Parabéns! Você formou a palavra '${palavra}' e ganhou ${score} pontos.`;
        document.getElementById('palavra').value = '';
        tentativasRestantes = 4;
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

// Calcular score da palavra
function calcularScore(palavra) {
    let score = 0;
    for (let i = 0; i < palavra.length; i++) {
        score += palavra.charCodeAt(i) - 96; // 'a' vale 1, 'b' vale 2, ...
    }
    return score;
}

// Iniciar o jogo ao carregar a página
window.onload = iniciarJogo;