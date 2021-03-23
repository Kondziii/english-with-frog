import frogMovie from '../../../../../assets/movies/frogMovie.mp4';
import './Login.css';

const Login = () => {
  return (
    <div className='loginPanel'>
      <div className='videoWrapper'>
        <video autoPlay muted loop>
          <source src={frogMovie} type='video/mp4' />
        </video>
      </div>
    </div>
  );
};

export default Login;
