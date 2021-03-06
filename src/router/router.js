//App Import
import Vue from 'vue'
import VueRouter from 'vue-router'

//Components import
import UpcomingEvents from '../components/events/UpcomingEvents'
import About from '../components/about/About'
import Login from '../components/authentication/Login'
import Register from '../components/authentication/Register'
import Contacts from '../components/contacts/Contacts'
import AddEvent from '../components/events/AddEvent'
import Details from '../components/events/Details'
import PageNotFound from '../components/common/PageNotFound'
import PageUnderConstruction from '../components/common/PageUnderConstruction'
import Admin from '../components/administration/Admin'

//Route guard
import auth from './route-guards/authentication'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: UpcomingEvents
  },

  {
    path: '/about',
    name: 'About',
    component: About
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: function (to, from, next) {
      if (!localStorage.uid || !localStorage.userEmail) {
        next('/');
      }

      next();
    }
  },

  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },

  {
    path: '/questions-and-answers',
    name: 'Q&AUnderConstruction',
    component: PageUnderConstruction,
  },

  {
    path: '/profile',
    name: 'ProfileUnderConstruction',
    component: PageUnderConstruction,
  },

  {
    path: '/add-event',
    name: 'AddEvent',
    component: AddEvent
  },

  {
    path: '/events/organise/:id',
    name: 'OrganiseUnderConstruction',
    component: PageUnderConstruction
  },

  //If the event is private there will be user id in the route
  {
    path: '/events/details/:uid?/:id',
    name: 'Details',
    component: Details
  },

  //If the event is private there will be user id in the route
  {
    path: '/edit-event/:uid?/:id',
    name: 'EditPrivateEvent',
    component: AddEvent
  },

  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(auth);

export default router;
