<template>
  <div>
    <Titulo text="Aluno" />
    <div>
      <input type="text" placeholder="Nome do Aluno" v-model="nome" v-on:keyup.enter="addAluno()" />
      <button class="btn btn-input" v-on:click="addAluno()">Adicionar</button>
    </div>

    <table>
      <thead>
        <th>Mat.</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="alunos.length">
        <tr v-for="(aluno,index) in alunos" :key="index">
          <td>{{aluno.id}}</td>
          <td>{{aluno.nome}}</td>
          <td>
            <button class="btn btn-danger" @click="removeAluno(aluno)">Remover</button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>Nenhum aluno encontrado</tfoot>
    </table>
  </div>
</template>

<script>
import Titulo from "../Shared/Titulo";

export default {
  components: {
    Titulo
  },
  props: {},
  data() {
    return {
      titulo: "Aluno",
      nome: "",
      alunos: []
    };
  },
  created() {
    this.$http
      .get("http://localhost:3000/alunos")
      .then(res => res.json())
      .then(alunos => (this.alunos = alunos));
  },
  methods: {
    addAluno() {
      let _aluno = {
        nome: this.nome
      };
      this.$http
        .post("http://localhost:3000/alunos", _aluno)
        .then(res => res.json())
        .then(aluno => {
          this.alunos.push(aluno);
          this.nome = "";
        });
    },

    removeAluno(aluno) {
      this.$http.delete(`http://localhost:3000/alunos/${aluno.id}`).then(() => {
        let _indice = this.alunos.indexOf(aluno);
        this.alunos.splice(_indice, 1);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border: 0px;
  margin: 0px;
  padding: 20px;
  font-size: 1.3em;
  color: #687f7f;
}

.btn-input {
  border: 0px;
  margin: 0px;
  padding: 20px;
  font-size: 1.3em;
  background-color: rgb(116, 115, 115);
}

.btn-input:hover {
  padding: 20px;
  margin: 0;
  border: 0;
}
</style>
