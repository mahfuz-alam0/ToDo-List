import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Update = () => {
    const { user, updateUser, ChangePassword, signIn, setLoading, loading } = React.useContext(AuthContext);
    const [userDB, setUserDB] = React.useState(null);

    React.useEffect(() => {
        fetch(`https://task-server-rose.vercel.app/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserDB(data)
            })
    }, [user])

    const handleName = (event) => {
        event.preventDefault();
        const name = event.target[0].value
        const userInfo = {
            displayName: event.target[0].value
        }
        updateUser(userInfo)
            .then(() => {
                save_user({ name })
                event.target.reset()
            })
            .catch(err => console.log(err));
    }
    const handlePassword = (event) => {
        event.preventDefault();
        const password = event.target[0].value
        ChangePassword(password)
            .then(() => {
                save_user({ password })
                event.target.reset()
            })
            .catch(err => console.log(err));
    }
    const handlePhone = (event) => {
        event.preventDefault();
        const phone = event.target[0].value
        save_user({ phone })
        event.target.reset()
    }





    const save_user = (userInfo) => {

        fetch(`https://task-server-rose.vercel.app/users/${userDB._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Updated Successfully')
                }
            })
    }


    return (
        <div className=''>
            <div className='min-h-screen flex justify-center items-center'>
                <div>
                    <div className='flex gap-2'>
                        <div className='bg-green-100 rounded-xl drop-shadow-md w-80 p-7'>
                            <form onSubmit={handleName}>
                                <div className="form-control w-full mb-3">
                                    <label className="label"> <span className="label-text">Change Name</span></label>
                                    <input type="text" className="p-2 rounded-md bg-green-100 border-2 border-green-700 w-full " placeholder={userDB?.name} />
                                </div>

                                <input disabled={loading ? true : false} className='p-3 bg-green-500 rounded-md my-5 w-full hover:bg-green-700 hover:text-white duration-300 font-semibold cursor-pointer' value="Update" type="submit" />

                            </form>
                        </div>
                        <div className='bg-green-100 rounded-xl drop-shadow-md w-80 p-7'>
                            <form onSubmit={handlePassword}>
                                <div className="form-control w-full mb-3">
                                    <label className="label"> <span className="label-text">Change Password</span></label>
                                    <input type="password"
                                        className="p-2 rounded-md bg-green-100 border-2 border-green-700 w-full " />
                                </div>

                                <input disabled={loading ? true : false} className='p-3 bg-green-500 rounded-md my-5 w-full hover:bg-green-700 hover:text-white duration-300 font-semibold cursor-pointer' value="Update" type="submit" />
                            </form>
                        </div>
                        <div className='bg-green-100 rounded-xl drop-shadow-md w-80 p-7'>
                            <form onSubmit={handlePhone}>
                                <div className="form-control w-full mb-3">
                                    <label className="label"> <span className="label-text">Change Phone</span></label>
                                    <input type="text"
                                        className="p-2 rounded-md bg-green-100 border-2 border-green-700 w-full " placeholder={userDB?.phone} />
                                </div>

                                <input disabled={loading ? true : false} className='p-3 bg-green-500 rounded-md my-5 w-full hover:bg-green-700 hover:text-white duration-300 font-semibold cursor-pointer' value="Update" type="submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;