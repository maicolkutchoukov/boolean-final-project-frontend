import { createRouter, createWebHistory } from 'vue-router';

/* import HomePage from './pages/HomePage.vue'; */
import HommePage from './pages/HommePage.vue'
import SearchPage from './pages/SearchPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {
        //     path: '/',
        //     name: 'home',
        //     component: HomePage
        // },
        {
            path: '/',
            name: 'homme',
            component: HommePage
        },
        {
            path: '/search',
            name: 'search',
            component: SearchPage
        },
        {
            path: '/profile/:name',
            name: 'profile',
            component: ProfilePage
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage
        },
    ]
});

export { router };