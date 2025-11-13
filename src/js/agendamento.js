// Seleciona elementos do formulário
const form = document.getElementById("formAgendamento");
const dataInput = document.getElementById("data");
const horaSelect = document.getElementById("hora");
const msgErro = document.getElementById("msgErro");
const msgSucesso = document.getElementById("msgSucesso");

const WHATSAPP = "5585991610300";
const CHAVE_STORAGE = "agendamentos";

// Busca agendamentos salvos
const buscarAgendamentos = () => {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : {};
};

// Salva agendamentos
const salvarAgendamentos = (agendamentos) => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(agendamentos));
};

// Define data mínima como hoje
dataInput.min = new Date().toISOString().split("T")[0];

// Verifica se é domingo
const ehDomingo = (data) => {
    return new Date(data + "T00:00:00").getDay() === 0;
};

// Exibe mensagens de erro ou sucesso
const exibirMensagem = (tipo, texto) => {
    if (tipo === "erro") {
        msgErro.textContent = texto;
        msgSucesso.textContent = "";
    } else {
        msgSucesso.textContent = texto;
        msgErro.textContent = "";
    }
};

// Gera horários das 09:00 às 17:30
const gerarHorarios = () => {
    horaSelect.innerHTML = '<option value="">Selecione um horário</option>';
    
    for (let hora = 9; hora <= 17; hora++) {
        for (let minuto = 0; minuto < 60; minuto += 30) {
            const horario = `${String(hora).padStart(2, "0")}:${String(minuto).padStart(2, "0")}`;
            horaSelect.innerHTML += `<option value="${horario}">${horario}</option>`;
        }
    }
};

// Desabilita horários já agendados
const bloquearHorarios = (data) => {
    const agendamentos = buscarAgendamentos();
    const ocupados = agendamentos[data] || [];
    
    Array.from(horaSelect.options).forEach(option => {
        if (ocupados.includes(option.value)) {
            option.disabled = true;
            option.textContent += " (Indisponível)";
        }
    });
};

// Quando selecionar uma data
dataInput.addEventListener("change", () => {
    const data = dataInput.value;
    
// Bloqueia domingos
    if (ehDomingo(data)) {
        exibirMensagem("erro", "⌚ Domingo não disponível");
        dataInput.value = "";
        return;
    }
    
    exibirMensagem("sucesso", "");
    gerarHorarios();
    bloquearHorarios(data);
});

// Ao enviar o formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nome = form.elements.nome.value;
    const servico = form.elements.servico.value;
    const data = form.elements.data.value;
    const hora = form.elements.hora.value;
    
// Valida campos
    if (!nome || !servico || !data || !hora) {
        return exibirMensagem("erro", "⚠️ Preencha todos os campos");
    }
    
    const agendamentos = buscarAgendamentos();
    
// Verifica se horário está disponível
    if (agendamentos[data]?.includes(hora)) {
        return exibirMensagem("erro", "⌚ Horário já agendado");
    }
    
// Salva novo agendamento
    if (!agendamentos[data]) agendamentos[data] = [];
    agendamentos[data].push(hora);
    salvarAgendamentos(agendamentos);
    
// Formata data para exibição
    const dataFormatada = data.split("-").reverse().join("/");
    exibirMensagem("sucesso", `✅ Agendamento confirmado para ${dataFormatada} às ${hora}`);
    
// Prepara mensagem do WhatsApp
    const mensagem = `Olá! Meu nome é ${nome}. Quero confirmar meu agendamento de ${servico} para ${dataFormatada} às ${hora}.`;
    
// Envia WhatsApp e reseta formulário
    setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`, "_blank");
        form.reset();
        horaSelect.innerHTML = '<option value="">Escolha a data primeiro</option>';
    }, 1500);
});

// Inicializa gerando horários
gerarHorarios();