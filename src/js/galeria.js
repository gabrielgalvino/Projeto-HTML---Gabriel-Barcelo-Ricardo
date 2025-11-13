// Seleciona elementos principais
const filtros = document.querySelectorAll('.botao-filtro');
const itens = document.querySelectorAll('.item');
const lightbox = document.getElementById('lightbox');
const imgLightbox = document.getElementById('img-lightbox');
const contador = document.getElementById('contador');
const btnFechar = document.querySelector('.botao-fechar');
const btnAnterior = document.querySelector('.anterior');
const btnProximo = document.querySelector('.proximo');

let indiceAtual = 0;
let itensVisiveis = [];

// Atualiza lista de itens visíveis (não escondidos)
const atualizarVisiveis = () => {
    itensVisiveis = Array.from(itens).filter(item => 
        !item.classList.contains('escondido')
    );
};

// Abre lightbox com a imagem selecionada
const abrirLightbox = () => {
    const item = itensVisiveis[indiceAtual];
    const img = item.querySelector('img');
    
    imgLightbox.src = img.src;
    imgLightbox.alt = img.alt;
    contador.textContent = `${indiceAtual + 1} / ${itensVisiveis.length}`;
    lightbox.classList.add('aberto');
};

// Navega entre imagens (-1 = anterior, +1 = próxima)
const navegar = (direcao) => {
    indiceAtual = (indiceAtual + direcao + itensVisiveis.length) % itensVisiveis.length;
    abrirLightbox();
};

// Fecha a lightbox
const fecharLightbox = () => {
    lightbox.classList.remove('aberto');
};

// Filtra itens por categoria
filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
        // Atualiza botão ativo
        filtros.forEach(f => f.classList.remove('ativo'));
        filtro.classList.add('ativo');
        
        const categoria = filtro.dataset.filtro;
        
// Mostra/esconde itens conforme categoria
        itens.forEach(item => {
            const mostrar = categoria === 'todos' || item.dataset.categoria === categoria;
            item.classList.toggle('escondido', !mostrar);
        });
        
        atualizarVisiveis();
    });
});

// Abre lightbox ao clicar em um item
itens.forEach(item => {
    item.addEventListener('click', () => {
        atualizarVisiveis();
        indiceAtual = itensVisiveis.indexOf(item);
        abrirLightbox();
    });
});

// Eventos da lightbox
btnFechar.addEventListener('click', fecharLightbox);
btnAnterior.addEventListener('click', () => navegar(-1));
btnProximo.addEventListener('click', () => navegar(1));

// Fecha ao clicar fora da imagem
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) fecharLightbox();
});

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('aberto')) return;
    
    if (e.key === 'Escape') fecharLightbox();
    if (e.key === 'ArrowLeft') navegar(-1);
    if (e.key === 'ArrowRight') navegar(1);
});

// Inicializa lista de itens visíveis
atualizarVisiveis();