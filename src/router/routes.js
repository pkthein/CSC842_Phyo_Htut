
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Main.vue') },
      { path: 'login', component: () => import('pages/LogIn.vue') },
      { path: 'signup', component: () => import('pages/SignUp.vue') },
      { path: 'init', component: () => import('pages/InitialUserEdit.vue') }
    ]
  },
  {
    path: '/forgot',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Recovery.vue') },
      {
        path: 'username', component: () => import('pages/RecoverUsername.vue')
      },
      { path: 'password', component: () => import('pages/RecoverPassword.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Profile.vue') },
      {
        path: 'edit', component: () => import('pages/EditUser.vue')
      },
      { path: 'ingredient', component: () => import('pages/Ingredient.vue') }
    ]
  },
  {
    path: '/recipe',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'page', component: () => import('pages/Recipe.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
