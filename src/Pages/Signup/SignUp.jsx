import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';


const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = React.useContext(AuthContext);
    const [signUpError, setSignUPError] = React.useState('');
    const [userEmail, setUserEmail] = React.useState(null);
    const [token] = useToken(userEmail);
    const [signInLoading, setSignInLoading] = React.useState(false);

    const navigate = useNavigate();


    if (token) {
        navigate('/home');
    }

    const handleSignUp = (data) => {
        loading_true()
        setSignUPError('');

        createUser(data.email, data.password)
            .then(result => {
                const userInfo = {
                    displayName: data.name
                }
                const userDB = {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    phone: data.phone
                }
                updateUser(userInfo)
                    .then(() => {
                        save_user(userDB)
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                setSignUPError(error.message)
            });
    }

    const save_user = (userDB) => {

        fetch('https://task-server-rose.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userDB)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Account Created Successfully')
                    set_email_for_token(userDB.email)
                    loading_false()
                }
            })
    }

    const set_email_for_token = (email) => {
        setUserEmail(email)
    }

    const loading_true = () => setSignInLoading(true);
    const loading_false = () => setSignInLoading(false);

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='bg-green-100 rounded-xl drop-shadow-md w-96 p-7'>
                <h2 className='text-3xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", { required: "Name is Required" })}
                            className="p-2 rounded-md bg-green-100 border-2 border-green-700 w-full mb-4" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", { required: true })}
                            className="p-2 rounded-md bg-green-100 border-2 border-green-700 w-full mb-4" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Phone</span></label>
                        <input type="text" {...register("phone", { required: true })}
                            className="p-2 rounded-md bg-green-100 border-2 border-green-700 w-full mb-4" />
                        {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">SignUp As</span></label>
                        <select
                            {...register("role", { required: "Role is Required" })}
                            defaultValue="select" className="select input-bordered w-full">
                            <option disabled value='select'>Select One....</option>
                            <option value="0">As Admin</option>
                            <option value="1">As Clint</option>
                        </select>
                        {errors.role && <p className='text-red-500'>{errors.role.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required", minLength: { value: 6, message: "Password must be 6 characters long" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            })} className="p-2 rounded-md bg-green-100 border-2 border-green-700 w-full" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <input disabled={signInLoading ? true : false} className='p-3 bg-green-500 rounded-md my-5 w-full hover:bg-green-700 hover:text-white duration-300 font-semibold cursor-pointer' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account? <Link className='text-primary hover:underline' to="/login">Please Login</Link></p>
            </div>
        </div>
    );
};

export default SignUp;