import { createRouter, createWebHistory } from 'vue-router';

/* import HomePage from './pages/HomePage.vue'; */
import HomePage from './pages/HomePage.vue'
import HomePage2 from './pages/HomePage2.vue'
import AboutUsPage from './pages/AboutUsPage.vue'
import InstrumentPage from './pages/InstrumentPage.vue'
import SponsorPage from './pages/SponsorPage.vue'
import LoginPage from './pages/LoginPage.vue'
import SearchPage from './pages/SearchPage.vue'
import RegistrationPage from './pages/RegistrationPage.vue'
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
            path: '/sei-un-musicista',
            name: 'home2',
            component: HomePage2
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
            path: '/sponsor',
            name: 'sponsor',
            component: SponsorPage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/registration',
            name: 'registration',
            component: RegistrationPage
        },
        {
            path: '/search',
            name: 'search',
            component: SearchPage
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