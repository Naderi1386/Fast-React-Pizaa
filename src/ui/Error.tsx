import {  useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';
interface ErrorType {
  data:string
  message:string
}
function NotFound() {
  const error=useRouteError()
  const getErrorText=error as ErrorType
  

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{getErrorText.data ? getErrorText.data : getErrorText.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
