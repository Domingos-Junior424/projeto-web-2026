const campoPesquisa = document.querySelector('#pesquisa');
const botoesCategoria = document.querySelectorAll('[data-filtro]');
const pratos = document.querySelectorAll(".prato");
const contador = document.querySelector('#contador');
const semResultados = document.querySelector('#sem-resultados');

let categoriaAtiva = 'todos';

// Tira acentos e maiúsculas, para "pastel" encontrar "Pastéis"
function normalizar(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function atualizarLista() {
    const termo = normalizar(campoPesquisa.value.trim());
    let visiveis = 0;

    pratos.forEach((prato) => {
        const daCategoria = categoriaAtiva === 'todos' || prato.dataset.categoria === categoriaAtiva;
        const doTexto = normalizar(prato.textContent).includes(termo);
        const mostrar = daCategoria && doTexto;

        prato.hidden = !mostrar;
        if (mostrar) {
            visiveis++; 
        }
    });

    contador.textContent = visiveis === 1 ? '1 prato' : visiveis + ' pratos';
    semResultados.hidden = visiveis !== 0;
}

// Escrever na pesquisa atualiza a lista a cada letra
campoPesquisa.addEventListener('input', atualizarLista);

// Clicar numa categoria marca-a como ativa e atualiza a lista
botoesCategoria.forEach((botaoCategoria) => {
    botaoCategoria.addEventListener('click', () => {
        categoriaAtiva = botaoCategoria.dataset.filtro;

        botoesCategoria.forEach((outro) => {
        outro.setAttribute('aria-pressed', outro === botaoCategoria ? 'true' : 'false');
        });

        atualizarLista();
    });
});

atualizarLista();