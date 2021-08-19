import Home from 'pages/Home';
import NotpadForm from 'pages/Notepad';

export const routes = [
  {
    component: Home,
    exact: true,
    path: '/',
  },
  {
    component: NotpadForm,
    exact: true,
    path: '/notepad',
  },
];
