import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from './toastUtils.js';

export function ToastProvider() {
  return <ToastContainer {...toastConfig} />;
}
