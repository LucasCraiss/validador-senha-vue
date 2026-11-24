/**
 * Regras de senha forte, em um único lugar.
 *
 * As três funções abaixo compartilham os mesmos critérios:
 *  - mínimo de 8 caracteres
 *  - pelo menos uma letra maiúscula
 *  - pelo menos um número
 *  - pelo menos um caractere especial
 */

export const TAMANHO_MINIMO = 8;

export const REGEX_MAIUSCULA = /[A-Z]/;
export const REGEX_NUMERO = /[0-9]/;
export const REGEX_ESPECIAL = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'`~]/;

/**
 * Lista os requisitos não atendidos por uma senha.
 *
 * @param {string} senha
 * @returns {string[]} mensagens de erro; array vazio quando a senha é válida
 */
export const validarSenhaForte = (senha) => {
    const erros = [];

    if (senha.length < TAMANHO_MINIMO) {
        erros.push(`A senha deve ter no mínimo ${TAMANHO_MINIMO} caracteres`);
    }

    if (!REGEX_MAIUSCULA.test(senha)) {
        erros.push('A senha deve conter pelo menos uma letra maiúscula');
    }

    if (!REGEX_NUMERO.test(senha)) {
        erros.push('A senha deve conter pelo menos um número');
    }

    if (!REGEX_ESPECIAL.test(senha)) {
        erros.push('A senha deve conter pelo menos um caractere especial');
    }

    return erros;
};

/**
 * @param {string} senha
 * @returns {boolean} true quando todos os requisitos são atendidos
 */
export const senhaValida = (senha) => {
    return (
        senha.length >= TAMANHO_MINIMO &&
        REGEX_MAIUSCULA.test(senha) &&
        REGEX_NUMERO.test(senha) &&
        REGEX_ESPECIAL.test(senha)
    );
};

/**
 * Mensagem única com todos os requisitos — útil em erro de API ou tooltip.
 *
 * @returns {string}
 */
export const obterMensagemRequisitos = () => {
    return `A senha deve ter no mínimo ${TAMANHO_MINIMO} caracteres, incluindo: 1 letra maiúscula, 1 número e 1 caractere especial (!@#$%^&*(),.?":{}|<>_-+=[]\\/;'\`~)`;
};
