import { IPessoa } from "./../interfaces/Pessoas";
import http from "@/http";
import { defineStore } from "pinia";

export const usePessoasStore = defineStore("Pessoas", {
  state: () => ({
    pessoas: [] as IPessoa[],
  }),
  actions: {
    async listPessoas() {
      try {
        const resposta = (await http.get("pessoas")).data as [IPessoa];
        resposta.forEach((pessoa: IPessoa) => {
          pessoa.data_de_cadastro = new Date(pessoa.data_de_cadastro);
          pessoa.nascimento = new Date(pessoa.nascimento);
          this.pessoas.push(pessoa);
        });
      } catch (error) {
        return error;
      }
    },
    getPessoaPorNome(nome: String): IPessoa {
        let pessoaAchada = {} as IPessoa
        this.pessoas.forEach((pessoa: IPessoa) => {
          if (pessoa.nome == nome) {
            pessoaAchada = pessoa
          }
        });
        return pessoaAchada
      },
    getNomePorId(id:number):string{
      console.log(id)
      let nomeAchado = "" as string
      this.pessoas.forEach((pessoa: IPessoa) => {
        if (pessoa.id == id) {
          nomeAchado = pessoa.nome
        }
      })
      return nomeAchado
    }
  },
  getters: {
    getPessoas: (state) => state.pessoas,
    
  },
});
