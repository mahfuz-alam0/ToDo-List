import React from 'react';

const AllList = () => {

    const [allList, setAllList] = React.useState();

    React.useEffect(() => {
        fetch('https://task-server-rose.vercel.app/allList', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
        })
            .then(res => res.json())
            .then(data => setAllList(data))
    }, [])


    const handleDelete = (id) => {
        fetch(`https://task-server-rose.vercel.app/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
        }).then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    const newTodos = allList.filter(item => item._id !== id);
                    setAllList(newTodos);
                }
            })
    }

    return (
        <div>
            <div className='max-w-[1000px] mx-auto'>
                <h3 className='text-3xl text-center mt-5'>All List</h3>
                <table className="min-w-full divide-y divide-gray-200 mt-5">
                    <thead className=''>
                        <tr>
                            <th scope="col" className="bg-white px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ToDo
                            </th>
                            <th scope="col" className="bg-white px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time
                            </th>
                            <th scope="col" className="bg-white px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                What ToDo
                            </th>
                            <th scope="col" className="bg-white px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                email
                            </th>
                            <th scope="col" className="bg-white px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            allList?.map(item =>
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{item.todo}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.time}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.whattodo}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.user}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex">
                                            <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        {/* <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">John Doe</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">30</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex">
                                    <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Male
                                    </button>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                        Female
                                    </button>
                                </div>
                            </td>
                        </tr> */}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AllList;