import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, setLoading, loading } = React.useContext(AuthContext);
    const [loginError, setLoginError] = React.useState('');

    const [userEmail, setUserEmail] = React.useState(null);
    const [token] = useToken(userEmail)


    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/home/view';

    if (token) {
        navigate(from);
    }

    const handleLogin = (data) => {
    
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                if (user) {
                    setUserEmail(user.email);
                    setLoading(false)
                    toast.success('Login Successful')
                }

            }).catch(error => {
                setLoginError(error.message);
            });
    }



    return (
        <div>
            <div className='h-screen flex justify-center items-center'>
                <div className='bg-green-100 rounded-xl drop-shadow-md w-96 p-7'>
                    <h2 className='text-3xl text-center'>Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-control w-full mb-3">
                            <label className="label"> <span className="label-text">Email</span></label>
                            <input type="text"
                                {...register("email", {
                                    required: "Email Address is required"
                                })}
                                className="p-2 rounded-md bg-green-100 border-2 border-green-700 w-full " />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label"> <span className="label-text">Password</span></label>
                            <input type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })}
                                className="p-2 rounded-md bg-green-100 border-2 border-green-700 w-full " />
                            <label className="label"> <span className="label-text">Forget Password?</span></label>
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <input disabled={loading ? true : false} className='p-3 bg-green-500 rounded-md my-5 w-full hover:bg-green-700 hover:text-white duration-300 font-semibold cursor-pointer' value="Login" type="submit" />
                        <div>
                            {loginError && <p className='text-red-600'>{loginError}</p>}
                        </div>
                    </form>
                    <p>Don't have account ! <Link className='text-primary hover:underline' to="/signup">Create new Account</Link></p>

                    {/* <SocialLogin /> */}
                </div>
            </div>
        </div>
    );
};

export default Login;