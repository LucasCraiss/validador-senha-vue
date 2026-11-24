import { describe, it, expect } from 'vitest';
import { validarSenhaForte, senhaValida, obterMensagemRequisitos } from './senhaValidacao.js';

describe('senhaValidacao.js', () => {
    describe('validarSenhaForte', () => {
        it('retorna erro quando senha tem menos de 8 caracteres', () => {
            const erros = validarSenhaForte('Ab1!');
            expect(erros).toContain('A senha deve ter no mínimo 8 caracteres');
        });

        it('retorna erro quando não tem letra maiúscula', () => {
            const erros = validarSenhaForte('senha123!');
            expect(erros).toContain('A senha deve conter pelo menos uma letra maiúscula');
        });

        it('retorna erro quando não tem número', () => {
            const erros = validarSenhaForte('SenhaForte!');
            expect(erros).toContain('A senha deve conter pelo menos um número');
        });

        it('retorna erro quando não tem caractere especial', () => {
            const erros = validarSenhaForte('SenhaForte1');
            expect(erros).toContain('A senha deve conter pelo menos um caractere especial');
        });

        it('retorna array vazio para senha válida', () => {
            expect(validarSenhaForte('Senha123!')).toEqual([]);
        });

        it('aceita vários caracteres especiais', () => {
            expect(validarSenhaForte('Senha123@')).toEqual([]);
            expect(validarSenhaForte('Senha123#')).toEqual([]);
            expect(validarSenhaForte('Senha123_')).toEqual([]);
            expect(validarSenhaForte('Senha123~')).toEqual([]);
        });

        it('acumula todos os erros de uma senha vazia', () => {
            expect(validarSenhaForte('')).toHaveLength(4);
        });
    });

    describe('senhaValida', () => {
        it('retorna true para senha que atende todos os requisitos', () => {
            expect(senhaValida('Senha123!')).toBe(true);
        });

        it('retorna false para senha curta', () => {
            expect(senhaValida('Ab1!')).toBe(false);
        });

        it('retorna false para senha sem maiúscula', () => {
            expect(senhaValida('senha123!')).toBe(false);
        });

        it('retorna false para senha sem número', () => {
            expect(senhaValida('SenhaForte!')).toBe(false);
        });

        it('retorna false para senha sem caractere especial', () => {
            expect(senhaValida('SenhaForte1')).toBe(false);
        });
    });

    describe('obterMensagemRequisitos', () => {
        it('retorna mensagem descritiva dos requisitos', () => {
            const msg = obterMensagemRequisitos();
            expect(msg).toContain('8 caracteres');
            expect(msg).toContain('maiúscula');
            expect(msg).toContain('número');
            expect(msg).toContain('especial');
        });
    });
});
