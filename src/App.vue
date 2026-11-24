<template>
    <main class="min-h-screen bg-slate-100 px-4 py-10">
        <div class="mx-auto flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
            <header class="flex flex-col gap-1">
                <h1 class="text-lg font-semibold text-gray-800">Definir nova senha</h1>
                <p class="text-sm text-gray-500">
                    Os requisitos abaixo reagem a cada tecla: cinza enquanto pendente, vermelho quando
                    contrariado, verde quando atendido.
                </p>
            </header>

            <CampoSenha id="nova-senha" v-model="novaSenha" rotulo="Nova Senha" placeholder="Mínimo 8 caracteres" />

            <CampoSenha
                id="confirmar-senha"
                v-model="confirmarSenha"
                rotulo="Confirmar Nova Senha"
                placeholder="Repita a nova senha"
            />

            <ValidadorSenhaVisual :senha="novaSenha" :confirmacao="confirmarSenha" />

            <button
                type="button"
                class="mt-2 w-full cursor-pointer rounded-lg border-none bg-slate-900 py-3 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.3)] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                :disabled="!podeEnviar"
            >
                Redefinir Senha
            </button>
        </div>
    </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import CampoSenha from './components/CampoSenha.vue';
import ValidadorSenhaVisual from './components/ValidadorSenhaVisual.vue';
import { senhaValida } from './utilitarios/senhaValidacao.js';

const novaSenha = ref('');
const confirmarSenha = ref('');

const podeEnviar = computed(() => senhaValida(novaSenha.value) && novaSenha.value === confirmarSenha.value);
</script>
