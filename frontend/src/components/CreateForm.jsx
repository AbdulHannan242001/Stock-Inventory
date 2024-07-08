import React from 'react';
import PropTypes from 'prop-types';
import { TiMinus  } from "react-icons/ti";

const CreateForm = ({
    formTitle,
    formFields,
    onSubmit,
    formData,
    handleChange,
    items,
    handleItemChange,
    removeItem,
    addItem,
    totalPrice,
    boolean
}) => {
    const newBool = boolean ? boolean : false
    return (
        <div className="w-2/4 mx-auto p-4 pt-6 md:p-6 md:pt-12 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold text-center text-primary-dark">{formTitle}</h1>
            <form onSubmit={onSubmit}>
                {formFields.map(field => (
                    <div key={field.name} className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor={field.name}>
                            {field.label}
                        </label>
                        {field.type === 'select' ? (
                            <select
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                className="w-full p-2 pl-10 text-sm text-neutral-mediumGray bg-neutral-lightGray border"
                            >
                                {field.options.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                disabled={field.disabled ? field.disabled : false}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full p-2 pl-10 text-sm text-neutral-mediumGray bg-neutral-lightGray border"
                            />
                        )}
                    </div>
                ))}

                {newBool &&
                    <div className='mt-4 w-full overflow-hidden'>
                        <h2 className='text-xl font-semibold'>Items</h2>
                        {items.length !== 0
                            &&
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Unit Cost</th>
                                        <th>Category</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='items-center mb-2'>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td className='p-1 w-3/12'>
                                                <input
                                                    type='text'
                                                    placeholder='Item Name'
                                                    className='p-1 w-full border rounded'
                                                    value={item.name}
                                                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                                />
                                            </td>
                                            <td className='p-1 w-3/12'>
                                                <input
                                                    type='number'
                                                    placeholder='Quantity'
                                                    className='p-1 w-full border rounded'
                                                    value={item.quantity}
                                                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                                />
                                            </td>
                                            <td className='p-1 w-3/12'>
                                                <input
                                                    type='number'
                                                    placeholder='Unit Cost'
                                                    className='p-1 w-full border rounded'
                                                    value={item.unitCost}
                                                    onChange={(e) => handleItemChange(index, 'unitCost', e.target.value)}
                                                />
                                            </td>
                                            <td className='p-1 w-3/12'>
                                                <input
                                                    type='text'
                                                    placeholder='Enter Item Category'
                                                    className='p-1 w-full border rounded'
                                                    value={item.category}
                                                    onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                                                />
                                            </td>
                                            <td className='p-1 items-center'>
                                                <div
                                                    className='bg-red-500 cursor-pointer text-white rounded-full w-8 h-8 items-center flex justify-center'
                                                    onClick={() => removeItem(index)}
                                                >
                                                    < TiMinus   />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                        <button
                            className='bg-blue-500 text-white mt-4 p-2 rounded'
                            type='button'
                            onClick={addItem}
                        >
                            Add Item
                        </button>
                        <div className='text-right mt-4'>
                            <h3 className='text-xl font-semibold'>Total: ${totalPrice ? totalPrice.toFixed(2) : 0}</h3>
                        </div>
                    </div>
                }
                <button
                    type="submit"
                    className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-4 rounded"
                >
                    {`Create ${formTitle}`}
                </button>
            </form>
        </div>
    );
};

CreateForm.propTypes = {
    formTitle: PropTypes.string.isRequired,
    formFields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(PropTypes.string),
            initialValue: PropTypes.any,
        })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    formData: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            quantity: PropTypes.number,
            unitCost: PropTypes.number,
        })
    ),
    handleItemChange: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    totalPrice: PropTypes.number,
    boolean: PropTypes.bool,
};

export default CreateForm;
