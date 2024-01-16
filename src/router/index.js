import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      redirect: { name: 'boards' }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthView.vue')
    },
    {
      path:'/registration',
      name: 'registration',
      component: () => import('../views/auth/RegistrationView.vue')
    },
    {
      path: '/boards',
      name: 'boardsLayout',
      component: () => import('../views/boards/BoardsLayout.vue'),
      children: [
        {
          path: '',
          name: 'boards',
          component: () => import('../views/boards/BoardsView.vue')
        },
        {
          path: ':boardId',
          name: 'todo',
          component: () => import('../views/todo/TodoView.vue')
        },
        {
          path: ':boardId*',
          redirect: { name: 'boards' }
        },
      ]
    },
  ]
})

export default router
