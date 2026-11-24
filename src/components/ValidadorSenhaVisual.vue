<template>
    <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
        <p class="mb-2 text-xs font-semibold text-gray-700 dark:text-slate-300">Requisitos da senha:</p>
        <ul class="space-y-1.5">
            <li
                v-for="(requisito, index) in requisitos"
                :key="index"
                class="flex items-center text-sm"
                :data-estado="estadoDe(requisito)"
            >
                <!-- check -->
                <svg
                    v-if="requisito.cumprido"
                    class="mr-2 h-4 w-4 shrink-0 text-green-600 dark:text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd"
                    />
                </svg>
                <!-- x -->
                <svg
                    v-else
                    class="mr-2 h-4 w-4 shrink-0"
                    :class="requisito.divergente ? 'text-red-700/70 dark:text-red-400/80' : 'text-gray-400 dark:text-slate-500'"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clip-rule="evenodd"
                    />
                </svg>
                <span :class="classeTexto(requisito)">
                    {{ requisito.texto }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { TAMANHO_MINIMO, REGEX_MAIUSCULA, REGEX_NUMERO, REGEX_ESPECIAL } from '../utilitarios/senhaValidacao.js';

const props = defineProps({
    /** Senha digitada. */
    senha: {
        type: String,
        default: '',
    },
    /**
     * Confirmação da senha. Quando `null` (padrão), o item "As senhas coincidem"
     * não é exibido — use assim em telas que têm um único campo de senha.
     */
    confirmacao: {
        type: String,
        default: null,
    },
});

const requisitos = computed(() => {
    // Antes da primeira tecla nada é "errado", apenas pendente: os itens ficam cinza.
    const digitou = props.senha.length > 0;

    const base = [
        {
            texto: `Mínimo de ${TAMANHO_MINIMO} caracteres`,
            cumprido: props.senha.length >= TAMANHO_MINIMO,
        },
        {
            texto: 'Pelo menos uma letra maiúscula',
            cumprido: REGEX_MAIUSCULA.test(props.senha),
        },
        {
            texto: 'Pelo menos um número',
            cumprido: REGEX_NUMERO.test(props.senha),
        },
        {
            texto: 'Pelo menos um caractere especial',
            cumprido: REGEX_ESPECIAL.test(props.senha),
        },
    ].map((requisito) => ({ ...requisito, divergente: digitou && !requisito.cumprido }));

    if (props.confirmacao === null) return base;

    const preenchida = props.confirmacao.length > 0;
    const iguais = props.senha === props.confirmacao;

    return [
        ...base,
        {
            texto: 'As senhas coincidem',
            cumprido: preenchida && iguais,
            divergente: preenchida && !iguais,
        },
    ];
});

/**
 * @param {{ cumprido: boolean, divergente?: boolean }} requisito
 * @returns {'cumprido'|'divergente'|'pendente'}
 */
function estadoDe(requisito) {
    if (requisito.cumprido) return 'cumprido';
    if (requisito.divergente) return 'divergente';
    return 'pendente';
}

/**
 * @param {{ cumprido: boolean, divergente?: boolean }} requisito
 * @returns {string}
 */
function classeTexto(requisito) {
    if (requisito.cumprido) return 'text-green-700 font-medium dark:text-green-400';
    if (requisito.divergente) return 'text-red-700/80 font-medium dark:text-red-400';
    return 'text-gray-600 dark:text-slate-400';
}
</script>
