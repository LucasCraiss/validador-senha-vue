<template>
    <main class="min-h-screen bg-neutral-100 px-4 py-10 transition-colors duration-200 dark:bg-neutral-950">
        <div
            class="mx-auto flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-6 shadow-sm transition-colors duration-200 dark:bg-neutral-900 dark:shadow-none dark:ring-1 dark:ring-neutral-800"
        >
            <header class="flex items-start justify-between gap-4">
                <div class="flex flex-col gap-1">
                    <h1 class="text-lg font-semibold text-gray-800 dark:text-neutral-100">Definir nova senha</h1>
                    <p class="text-sm text-gray-500 dark:text-neutral-400">
                        Os requisitos abaixo reagem a cada tecla: cinza enquanto pendente, vermelho quando
                        contrariado, verde quando atendido.
                    </p>
                </div>
                <button
                    type="button"
                    :aria-label="escuro ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
                    :title="escuro ? 'Tema claro' : 'Tema escuro'"
                    class="shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-white p-2 text-black transition-colors duration-200 hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                    @click="alternar"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-5 w-5"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                    </svg>
                </button>
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
                class="mt-2 w-full cursor-pointer rounded-lg border-none bg-neutral-900 py-3 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(23,23,23,0.3)] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none dark:bg-neutral-100 dark:text-neutral-900 dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] dark:disabled:bg-neutral-700 dark:disabled:text-neutral-400"
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
import { useTema } from './composaveis/useTema.js';
import { senhaValida } from './utilitarios/senhaValidacao.js';

const { escuro, alternar } = useTema();

const novaSenha = ref('');
const confirmarSenha = ref('');

const podeEnviar = computed(() => senhaValida(novaSenha.value) && novaSenha.value === confirmarSenha.value);
</script>
