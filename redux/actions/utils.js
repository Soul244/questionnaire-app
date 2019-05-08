export default function ({ status, statusText }) {
  let message;
  if (status >= 200 && status < 300) {
    message = 'success';
  } else if (status >= 300 && status < 500) {
    message = 'warning';
  } else {
    message = 'danger';
  }
  return {
    message,
    statusText,
  };
}
