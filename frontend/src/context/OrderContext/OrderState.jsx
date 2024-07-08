import React, { useEffect, useState } from 'react'
import OrderContext from './orderContext'
import toast from 'react-hot-toast';


const checkValidaty = async (vendorName, contact, payMethod, payStatus, expectedDelivery) => {
    if (vendorName.length > 0 &&
        contact.length > 0 &&
        payMethod.length > 0 &&
        payStatus.length > 0 &&
        expectedDelivery.length > 0) return true;
}

const OrderState = (props) => {
    const { children, authUser } = props;
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(false);
    const host = import.meta.env.VITE_REACT_APP_HOST || 'http://localhost:8000';

    const getOrders = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${host}/api/order/getorder`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authUser.token
                },
                credentials: 'include'
            });

            const data = await res.json();

            if (res.ok) {
                setOrderList(data);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const createOrder = async (vendorName, contact, payMethod, payStatus, expectedDelivery, items) => {
        try {

            setLoading(true);

            const isValid = await checkValidaty(vendorName, contact, payMethod, payStatus, expectedDelivery);

            if (typeof items !== "object" || items.length === 0) return toast.error('Please add items in the order');

            if (!isValid) return toast.error('All fields are required');

            const res = await fetch(`${host}/api/order/createorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ vendorName, contact, payMethod, payStatus, expectedDelivery, items })
            });

            const data = await res.json();

            if (res.ok) {
                setOrderList([...orderList, data]);
            } else {
                toast.error(data.message);
            }

            return data.orderId;

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const editOrder = async (
        id,
        status,
        deliveryStatus,
        vendorName,
        contact,
        payMethod,
        payStatus,
        expectedDelivery,
        transactionId,
        items
    ) => {
        try {
            setLoading(true);

            const isValid = await checkValidaty(vendorName, contact, payMethod, payStatus, expectedDelivery);

            if (!isValid) return toast.error('All fields are required');

            const res = await fetch(`${host}/api/order/editorder/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    status,
                    deliveryStatus,
                    vendorName,
                    contact,
                    payMethod,
                    payStatus,
                    expectedDelivery,
                    transactionId,
                    items
                })
            });

            const data = await res.json();
            if (res.ok) {
                setOrderList(orderList.map((order) => (order._id).toString() === (id).toString() ? data : order));
                toast.success("Order updated successfully");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const changeDeliveryStatus = async (id, status) => {
        try {
            setLoading(true);

            const res = await fetch(`${host}/api/order/changedeliverystatus/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ status })
            });

            const data = await res.json();

            if (res.ok) {
                setOrderList(orderList.map((order) => (order._id).toString() === (id).toString() ? data : order));
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const changeOrderStatus = async (id, status) => {
        try {
            setLoading(true);

            const res = await fetch(`${host}/api/order/changeorderstatus/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ status })
            });

            const data = await res.json();

            if (res.ok) {
                setOrderList(orderList.map((order) => (order._id) === (id).toString() ? data : order));
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    const deleteOrderItem = async (id, itemId) => {
        try {
            setLoading(true);

            const res = await fetch(`${host}/api/order/deleteitem/${id}/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message);
                setOrderList(() => {
                    return orderList.map((order) => {
                        if (order._id !== id) {
                            return {
                                ...order,
                                data
                            }
                        } else {
                            return order
                        }
                    })
                })

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (authUser) {
            getOrders();
        }
    }, [authUser])

    return (
        <OrderContext.Provider value={{
            loading,
            orderList,
            createOrder,
            editOrder,
            changeDeliveryStatus,
            deleteOrderItem
        }}
        >
            {children}
        </OrderContext.Provider>
    )
}


export default OrderState;