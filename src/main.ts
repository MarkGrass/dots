import './style.css';
import { Viewport } from './core/viewport';

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        const root = document.querySelector('#app');
        new Viewport(root);
    }
});
