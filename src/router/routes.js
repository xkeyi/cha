export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home')
  },
  {
    path: '/category/:categoryId',
    name: 'category',
    component: () => import('@/views/home/Home')
  },
  {
    path: '/tag/:tagId',
    name: 'tag',
    component: () => import('@/views/home/Home')
  },
  {
    path: '/auth/register',
    name: 'auth.register',
    component: () => import('@/views/auth/Register')
  },
  {
    path: '/auth/login',
    name: 'auth.login',
    component: () => import('@/views/auth/Login')
  },
  {
    path: '/article/:articleId/show',
    name: 'article.show',
    component: () => import('@/views/articles/Show')
  }
]
