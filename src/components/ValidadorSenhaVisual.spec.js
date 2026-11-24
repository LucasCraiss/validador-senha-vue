import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ValidadorSenhaVisual from './ValidadorSenhaVisual.vue';

/** @returns {string[]} estado de cada item na ordem em que aparecem */
const estados = (wrapper) => wrapper.findAll('li').map((li) => li.attributes('data-estado'));

describe('ValidadorSenhaVisual.vue', () => {
    it('mostra 4 requisitos quando não há confirmação', () => {
        const wrapper = mount(ValidadorSenhaVisual, { props: { senha: '' } });
        expect(wrapper.findAll('li')).toHaveLength(4);
    });

    it('mostra 5 requisitos quando a confirmação é informada', () => {
        const wrapper = mount(ValidadorSenhaVisual, { props: { senha: '', confirmacao: '' } });
        expect(wrapper.findAll('li')).toHaveLength(5);
    });

    it('deixa tudo pendente — e não vermelho — antes da primeira tecla', () => {
        const wrapper = mount(ValidadorSenhaVisual, { props: { senha: '' } });
        expect(estados(wrapper)).toEqual(['pendente', 'pendente', 'pendente', 'pendente']);
    });

    it('marca como divergente o requisito não atendido depois que o usuário digita', () => {
        const wrapper = mount(ValidadorSenhaVisual, { props: { senha: 'senha123!' } });
        // tamanho ok, maiúscula faltando, número ok, especial ok
        expect(estados(wrapper)).toEqual(['cumprido', 'divergente', 'cumprido', 'cumprido']);
    });

    it('marca todos como cumpridos para uma senha forte', () => {
        const wrapper = mount(ValidadorSenhaVisual, { props: { senha: 'Senha123!' } });
        expect(estados(wrapper)).toEqual(['cumprido', 'cumprido', 'cumprido', 'cumprido']);
    });

    it('mantém "As senhas coincidem" pendente enquanto a confirmação está vazia', () => {
        const wrapper = mount(ValidadorSenhaVisual, { props: { senha: 'Senha123!', confirmacao: '' } });
        expect(estados(wrapper).at(-1)).toBe('pendente');
    });

    it('marca divergência quando a confirmação não bate', () => {
        const wrapper = mount(ValidadorSenhaVisual, { props: { senha: 'Senha123!', confirmacao: 'Senha123' } });
        expect(estados(wrapper).at(-1)).toBe('divergente');
    });

    it('marca como cumprido quando as senhas coincidem', () => {
        const wrapper = mount(ValidadorSenhaVisual, { props: { senha: 'Senha123!', confirmacao: 'Senha123!' } });
        expect(estados(wrapper).at(-1)).toBe('cumprido');
    });

    it('declara variantes de tema escuro em todos os estados', () => {
        // Guarda contra um refactor de classes deixar o tema escuro para trás.
        const wrapper = mount(ValidadorSenhaVisual, { props: { senha: 'senha123', confirmacao: '' } });
        const html = wrapper.html();
        expect(html).toContain('dark:bg-neutral-800/50');
        expect(html).toContain('dark:text-green-400');
        expect(html).toContain('dark:text-red-400');
        expect(html).toContain('dark:text-neutral-400');
    });

    it('reage à mudança da prop', async () => {
        const wrapper = mount(ValidadorSenhaVisual, { props: { senha: 'abc' } });
        expect(estados(wrapper)[1]).toBe('divergente');
        await wrapper.setProps({ senha: 'Abc12345!' });
        expect(estados(wrapper)[1]).toBe('cumprido');
    });
});
