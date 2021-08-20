import NotpadForm from 'pages/Notepad';
import Chart from 'pages/Chart';

export const routes = [
  {
    component: NotpadForm,
    exact: true,
    path: '/notepad',
  },
  {
    component: Chart,
    exact: true,
    path: '/notepad/chart',
  },
  {
    component: NotpadForm,
    exact: true,
    path: '/notepad/:notepadId',
  },
];
