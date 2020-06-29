import Vue from 'vue';
import Router from 'vue-router';
import Alunos from "./components/Alunos/Alunos";
import Professor from "./components/Professor/Professor";
import Sobre from "./components/Sobre/sobre";

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/professores',
        nome: 'Professores',
        component: Professor
    },
    {
        path: '/alunos/:prof_id',
        nome: 'Alunos',
        component: Alunos
    },
    {
        path: '/alunosall',
        nome: 'Alunos',
        component: Alunos
    },
    {
        path: '/sobre',
        nome: 'Sobre',
        component: Sobre
    }]
})