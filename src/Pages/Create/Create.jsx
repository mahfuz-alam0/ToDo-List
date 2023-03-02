import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Create = () => {

    const { user } = React.useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setloading] = React.useState(false);
    const navigate = useNavigate();

    const [selectedTime, setSelectedTime] = useState('');

    function handleTimeChange(event) {
        setSelectedTime(event.target.value);
    }


    const handlesubmit = (data) => {

        console.log(data)
        setloading(true);

        const UpData = {
            todo: data.todo,
            time: data.time,
            whattodo: data.whattodo,
            user: user.email
        }

        fetch('http://localhost:5000/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(UpData)
        }).then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Report Submitted')
                    navigate('/home/view')
                }
                setloading(false);
            })
    }

    return (
        <div>
            <div className='min-h-screen flex justify-center items-center'>
                <div className='bg-green-100 rounded-xl drop-shadow-md w-96 p-7'>
                    <h2 className='text-3xl text-center'>Create List</h2>
                    <form onSubmit={handleSubmit(handlesubmit)}>

                        <div className="form-control w-full ">
                            <label className="label"> <span className="label-text">ToDo</span></label>
                            <input type="text"
                                {...register("todo", {
                                    required: "Problem topic is required"
                                })}
                                className="p-2 rounded-md bg-green-100 border-2 border-green-700 w-full" />
                            {errors.todo && <p className='text-red-600'>{errors.todo?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label"> <span className="label-text">Time</span></label>
                            <select
                                {...register("time", { required: "Role is Required" })}
                                value={selectedTime} onChange={handleTimeChange}
                                className='p-2 rounded-md bg-green-100 border-2 border-green-700 w-full'
                            >
                                <option value="">-- Select a time --</option>
                                <option value="8:00 AM">8:00 AM</option>
                                <option value="9:00 AM">9:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="1:00 PM">1:00 PM</option>
                                <option value="2:00 PM">2:00 PM</option>
                                <option value="3:00 PM">3:00 PM</option>
                                <option value="4:00 PM">4:00 PM</option>
                                <option value="5:00 PM">5:00 PM</option>
                                <option value="6:00 PM">6:00 PM</option>
                                <option value="7:00 PM">7:00 PM</option>
                                <option value="8:00 PM">8:00 PM</option>
                                <option value="9:00 PM">9:00 PM</option>
                                <option value="10:00 PM">10:00 PM</option>
                                <option value="11:00 PM">11:00 PM</option>
                            </select>
                            {errors.time && <p className='text-red-600'>{errors.time?.message}</p>}
                        </div>
                        <div className="form-control w-full mb-5">
                            <label className="label"> <span className="label-text">What ToDo</span></label>

                            <textarea className="p-2 rounded-md bg-green-100 border-2 border-green-700 w-full" rows='4' placeholder="Write Your Complain"
                                {...register("whattodo", { required: "Text area is required", })}
                            ></textarea>
                            {errors.complain && <p className='text-red-600'>{errors.complain?.message}</p>}
                        </div>
                        <input disabled={loading ? true : false} className={`p-3  rounded-md my-5 w-full  hover:text-white duration-300 font-semibold cursor-pointer ${loading ? 'bg-gray-400 hover:bg-gray-400' : "bg-green-500 hover:bg-green-700"}`} value="Submit" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;