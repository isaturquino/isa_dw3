const API_URL = 'http://localhost:3001/tarefas';

// DOM Elements
const form = document.getElementById('form-tarefa');
const inputDescricao = document.getElementById('descricao');
const container = document.getElementById('tarefas-container');
const toastContainer = document.getElementById('toast-container');

// Stats Elements
const statTotal = document.getElementById('stat-total');
const statPendentes = document.getElementById('stat-pendentes');
const statConcluidas = document.getElementById('stat-concluidas');

// Filtro Elements
const inputFiltroBusca = document.getElementById('filtro-busca');
const selectFiltroConcluido = document.getElementById('filtro-concluido');

// Debounce for search field
let debounceTimer;
function debouncedLoadTarefas() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        loadTarefas();
    }, 500);
}

// Start up
document.addEventListener('DOMContentLoaded', boot);

async function boot() {
    await loadTarefas();
    await loadResumo();
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await createTarefa();
});

// Exercício 4: GET /resumo
async function loadResumo() {
    // Animação de loading visual
    statTotal.innerText = '...';
    statPendentes.innerText = '...';
    statConcluidas.innerText = '...';

    try {
        const response = await fetch(`${API_URL}/resumo`);
        if (!response.ok) return; // Se a rota ainda não existir, ignora placidamente

        const dados = await response.json();
        
        // Efeito de contagem rápida
        statTotal.innerText = dados.total;
        statPendentes.innerText = dados.pendentes;
        statConcluidas.innerText = dados.concluidas;
    } catch (error) {
        console.log("Rota de resumo /resumo parece não estar disponível ainda.");
        statTotal.innerText = '-';
        statPendentes.innerText = '-';
        statConcluidas.innerText = '-';
    }
}

// GET /tarefas
async function loadTarefas() {
    container.innerHTML = '<div class="text-center text-slate-500 py-12 flex flex-col items-center gap-3"><i class="ph ph-spinner animate-spin text-4xl"></i><span class="text-sm">Buscando tarefas...</span></div>';
    
    try {
        // Query Strings (Passo 5 da Tutorial)
        const params = new URLSearchParams();
        const busca = inputFiltroBusca?.value;
        const concluido = selectFiltroConcluido?.value;

        if (busca) params.append('busca', busca);
        if (concluido) params.append('concluido', concluido);

        const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;

        const response = await fetch(url);
        if (!response.ok) throw new Error();
        
        const tarefas = await response.json();
        renderTarefas(tarefas);
    } catch (error) {
        showToast('Erro de conexão. Verifique se o servidor Fastify está rodando na porta 3000 e com CORS ativado.', 'error');
        container.innerHTML = `
            <div class="text-center text-rose-400 py-8 bg-rose-500/10 rounded-xl border border-rose-500/20">
                <i class="ph ph-warning-octagon text-4xl mb-2"></i>
                <p>O servidor não respondeu.</p>
            </div>`;
    }
}

// Render Engine
function renderTarefas(tarefas) {
    container.innerHTML = '';
    
    if (tarefas.length === 0) {
        container.innerHTML = `
            <div class="text-center text-slate-500 py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-700/50 rounded-xl">
                <i class="ph ph-wind text-4xl mb-2 opacity-50"></i>
                <p>Nenhuma tarefa no horizonte.</p>
            </div>
        `;
        return;
    }

    tarefas.forEach(tarefa => {
        const div = document.createElement('div');
        div.className = 'task-enter flex items-center justify-between p-4 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand/50 transition-colors group shadow-lg';
        
        // Estilização baseada no status
        const isDone = tarefa.concluido;
        const textStyle = isDone ? 'text-slate-500 line-through decoration-slate-600' : 'text-slate-100';
        
        // Checkbox visual (Exercício 3)
        const checkIcon = isDone 
            ? '<i class="ph-fill ph-check-square text-brand text-2xl drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"></i>' 
            : '<i class="ph ph-square text-slate-500 group-hover:text-brand transition-colors text-2xl"></i>';

        div.innerHTML = `
            <div class="flex items-center gap-4 flex-1 cursor-pointer select-none" onclick="toggleTarefa(${tarefa.id})">
                <div class="p-1 rounded-md transition-transform active:scale-95">
                    ${checkIcon}
                </div>
                <div class="flex flex-col">
                    <span class="${textStyle} font-medium tracking-wide">${tarefa.descricao}</span>
                    <span class="text-xs text-slate-500 font-mono mt-0.5">ID: ${tarefa.id}</span>
                </div>
            </div>
            
            <button onclick="event.stopPropagation(); deleteTarefa(${tarefa.id}, this)" class="text-slate-600 hover:text-rose-400 p-2 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 bg-slate-900/50 rounded-lg hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30" title="Excluir">
                <i class="ph ph-trash text-xl"></i>
            </button>
        `;
        container.appendChild(div);
    });
}

// POST /tarefas (Exercício 1: Validação incluída)
async function createTarefa() {
    const descricao = inputDescricao.value;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descricao }) // Mandamos apenas a descição. O Backend infere concluido=false.
        });

        // Pegamos o corpo da resposta (mesmo se for erro 400)
        const data = await response.json();

        if (response.ok) {
            showToast('Tarefa criada com sucesso!', 'success');
            inputDescricao.value = '';
            boot(); // recarrega lista e resumo
        } else {
            // Se o backend bloqueou via Exercício 1, mostramos no UI!
            // data deve ser algo como: { status: 'error', message: 'A descrição da tarefa é obrigatória' }
            showToast(data.message || 'Erro de validação na API', 'error');
            
            // Fazer o campo piscar vermelho
            inputDescricao.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
            setTimeout(() => inputDescricao.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500'), 1500);
        }
    } catch (error) {
        showToast('Ocorreu um erro ao comunicar com a API', 'error');
    }
}

// Exercício 3: PATCH /tarefas/:id/concluir
async function toggleTarefa(id) {
    try {
        // Notamos que não é preciso mandar body para a API nesse exercício!
        const response = await fetch(`${API_URL}/${id}/concluir`, {
            method: 'PATCH'
        });

        if (response.ok) {
            // Apenas atualiza estado visualmente e discretamente.
            boot();
        } else {
            const data = await response.json();
            showToast(data.message || 'Erro ao alterar status', 'error');
        }
    } catch (error) {
        showToast('Comunicação falhou', 'error');
    }
}

// DELETE /tarefas/:id
async function deleteTarefa(id, btnElement) {
    if (!confirm('Excluir esta tarefa definitivamente?')) return;

    // Animação de saída manual
    const taskElement = btnElement.closest('div.task-enter');
    if (taskElement) {
        taskElement.style.animation = 'fadeOutRight 0.3s forwards';
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok || response.status === 204) {
            showToast('Excluída', 'success');
            // Espera a animação acabar para dar o refresh de verdade
            setTimeout(() => boot(), 300);
        } else {
            const data = await response.json();
            showToast(data.message || 'Problema ao excluir', 'error');
            if (taskElement) taskElement.style.animation = 'none'; // cancel fade
        }
    } catch (error) {
        showToast('Deleção falhou na rede', 'error');
        if (taskElement) taskElement.style.animation = 'none';
    }
}

// Toast Engine
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const isError = type === 'error';
    
    const bgColor = isError ? 'bg-rose-500/20 border-rose-500/50 text-rose-200 shadow-rose-900/50' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 shadow-emerald-900/50';
    const icon = isError ? 'ph-warning-octagon' : 'ph-check-circle';

    toast.className = `toast-enter flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border backdrop-blur-md ${bgColor}`;
    
    toast.innerHTML = `
        <i class="ph-fill ${icon} text-2xl"></i>
        <p class="font-medium tracking-wide text-sm">${message}</p>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.replace('toast-enter', 'toast-exit');
        toast.addEventListener('animationend', () => toast.remove());
    }, 4500);
}
