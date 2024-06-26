import React from 'react';

const Notification = () => {
    const Nots = [
        {
            type: 'Low',
            alert: 'Item 1 is low on stock',
        },
        {
            type: 'Low',
            alert: 'Item 2 is low on stock',
        },
        {
            type: 'Due',
            alert: 'Order 3 is OverDue',
        },
        {
            type: 'Due',
            alert: 'Order 4 is OverDue',
        },
        {
            type: 'Del',
            alert: 'Order 5 is Delivering Today',
        }
    ];

    return (
        <div className='mx-4 h-[40vh] w-[40vh] border-2 bg-white rounded z-10 ml-auto fixed right-0 top-15 p-2 overflow-auto'>
            {Nots.length > 0 ? (
                Nots.map((notification, index) => (
                    <div key={index} className='w-100 h-auto p-2 bg-gray-100 my-2'>
                        <div className='flex'>
                            <p className='border-r-2 pr-4 border-gray-700 text-sm'>{notification.type}</p>
                            <p className='pl-4 text-sm'>{notification.alert}</p>
                        </div>
                        <div className='pt-1'>
                            <p className='text-xs self-bottom'>{new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className='w-100 h-auto p-2 bg-gray-200'>
                    <p className='text-center'>No notifications</p>
                </div>
            )}
        </div>
    );
};

export default Notification;
