import { onMounted, ref, watch } from 'vue';

const CHAVE = 'tema';

/**
 * Tema claro/escuro persistido em localStorage.
 *
 * Na primeira visita segue o sistema operacional (`prefers-color-scheme`);
 * a partir da primeira escolha manual, respeita o que o usuário escolheu.
 *
 * O efeito prático é uma classe `.dark` no <html> — é isso que os utilitários
 * `dark:` do Tailwind observam.
 */
export function useTema() {
    const escuro = ref(false);

    function aplicar(valor) {
        document.documentElement.classList.toggle('dark', valor);
    }

    function alternar() {
        escuro.value = !escuro.value;
        localStorage.setItem(CHAVE, escuro.value ? 'escuro' : 'claro');
    }

    onMounted(() => {
        const salvo = localStorage.getItem(CHAVE);
        escuro.value = salvo
            ? salvo === 'escuro'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;
        aplicar(escuro.value);
    });

    watch(escuro, aplicar);

    return { escuro, alternar };
}
