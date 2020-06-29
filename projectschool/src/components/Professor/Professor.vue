<template>
  <div>
    <Titulo text="Professores" />
    <table>
      <thead>
        <th>Cód.</th>
        <th>Nome</th>
        <th>Alunos</th>
      </thead>
      <tbody v-if="professores.length">
        <tr v-for="(professor,index) in professores" :key="index">
          <td>{{professor.id}}</td>

          <router-link
            v-bind:to="`/alunos/${professor.id}`"
            tag="td"
            style="cursor:pointer;"
          >{{professor.nome}}</router-link>
          <td>{{professor.qtdAlunos}}</td>
        </tr>
      </tbody>
      <tfoot v-else>Nenhum professor encontrado</tfoot>
    </table>
  </div>
</template>

<script>
import Titulo from "../Shared/Titulo";

export default {
  components: {
    Titulo
  },
  data() {
    return {
      professores: [],
      alunos: []
    };
  },
  created() {
    this.$http
      .get("http://localhost:3000/alunos")
      .then(res => res.json())
      .then(alunos => {
        this.alunos = alunos;
        this.carregarProfessores();
      });
  },
  props: {},
  methods: {
    pegarQtdAlunosProfessor() {
      this.professores.forEach((professor, index) => {
        professor = {
          id: professor.id,
          nome: professor.nome,
          qtdAlunos: this.alunos.filter(
            aluno => aluno.professor.id == professor.id
          ).length
        };
        console.log(this.professores[index]);
        this.professores[index] = professor;
      });
    },

    carregarProfessores() {
      this.$http
        .get("http://localhost:3000/professores")
        .then(res => res.json())
        .then(professores => {
          this.professores = professores;
          this.pegarQtdAlunosProfessor();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>