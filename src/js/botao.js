// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll(".btt");

// Mostra ou esconde os botões baseado na rolagem
    const alternarVisibilidade = () => {
        const rolouMais100px = window.scrollY > 100;
        botoes.forEach(botao => {
            botao.classList.toggle("show", rolouMais100px);
        });
    };

// Monitora a rolagem da página
    window.addEventListener("scroll", alternarVisibilidade);

// Adiciona ação de clique para voltar ao topo
    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
});