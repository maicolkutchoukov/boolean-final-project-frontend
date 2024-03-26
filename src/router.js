import { createRouter, createWebHistory } from 'vue-router';

/* import HomePage from './pages/HomePage.vue'; */
import HomePage from './pages/HomePage.vue'
import AboutUsPage from './pages/AboutUsPage.vue'
import InstrumentPage from './pages/InstrumentPage.vue'
import LoginPage from './pages/LoginPage.vue'
import ReviewPage from './pages/ReviewPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
         {
            path: '/chi-siamo',
            name: 'about',
            component: AboutUsPage
        },
        {
            path: '/strumenti',
            name: 'instrumental',
            component: InstrumentPage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/review',
            name: 'review',
            component: ReviewPage
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage
        },
    ]
});

export { router };