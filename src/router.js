import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Posts',
      component: () => import('./views/Posts.vue')
    },
    {
      path: '/posts/create',
      name: 'CreatePost',
      component: () => import('./views/CreatePost.vue')
    },
    {
      path: '/posts/edit/:id',
      name: 'EditPost',
      component: () => import('./views/EditPost.vue')
    },
    {
      path: '/posts/view/:id',
      name: 'ViewPost',
      component: () => import('./views/ViewPost.vue')
    }
  ]
})

export default router
