// Seleciona elementos principais
const comentarios = document.querySelectorAll('.comentario');
const pontinhos = document.getElementById('pontinhos');
const setaEsquerda = document.getElementById('setaEsquerda');
const setaDireita = document.getElementById('setaDireita');
let indiceAtual = 0;

// Cria os pontinhos de navegação
const criarPontinhos = () => {
    comentarios.forEach((_, index) => {
        const ponto = document.createElement('span');
        ponto.className = 'ponto';
        if (index === 0) ponto.classList.add('ativo');
        ponto.onclick = () => mostrarSlide(index);
        pontinhos.appendChild(ponto);
    });
};

// Exibe o slide correto
const mostrarSlide = (index) => {
// Remove 'ativo' de todos e adiciona apenas no selecionado
    comentarios.forEach((comentario, i) => {
        comentario.classList.toggle('ativo', i === index);
    });
    
    pontinhos.querySelectorAll('.ponto').forEach((ponto, i) => {
        ponto.classList.toggle('ativo', i === index);
    });
    
    indiceAtual = index;
};

// Navega para o slide anterior
setaEsquerda.onclick = () => {
    const novoIndice = (indiceAtual - 1 + comentarios.length) % comentarios.length;
    mostrarSlide(novoIndice);
};

// Navega para o próximo slide
setaDireita.onclick = () => {
    const novoIndice = (indiceAtual + 1) % comentarios.length;
    mostrarSlide(novoIndice);
};

// Inicializa o carrossel
criarPontinhos();
mostrarSlide(0);