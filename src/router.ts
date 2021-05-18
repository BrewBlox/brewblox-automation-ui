import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/:id?',
      component: () => import('@/plugins/automation/AutomationLayout.vue'),
    },

    { // Always leave this as last one
      path: '*',
      component: () => import('@/pages/404.vue'),
    },
  ],
  mode: 'history',
  base: '/automation-ui/',
});

// Strip hash on fresh page loads
// We use the hash to handle back button in dialogs
router.beforeResolve((to, from, next) => {
  from.fullPath === '/' && to.hash
    ? next({ path: to.path, hash: '' })
    : next();
});

export default router;
