import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },
    {
      path:'/registration',
      name: 'registration',
      component: () => import('../views/RegistrationView.vue')
    },
    {
      path: '/boards',
      name: 'boardsLayout',
      component: () => import('../views/BoardsLayout.vue'),
      children: [
        {
          path: '',
          name: 'boards',
          component: () => import('../views/BoardsView.vue')
        },
        {
          path: ':boardId',
          name: 'todo',
          component: () => import('../views/TodoView.vue')
        },
        {
          path: ':boardId*',
          redirect: { name: 'boards'}
        },
      ]
    }
  ]
})

export default router
