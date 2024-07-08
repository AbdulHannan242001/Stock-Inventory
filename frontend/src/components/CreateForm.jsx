import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateForm = ({ formTitle, formFields, onSubmit, formData, handleChange }) => {
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
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full p-2 pl-10 text-sm text-neutral-mediumGray bg-neutral-lightGray border"
                            >
                                {/* {field.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))} */}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full p-2 pl-10 text-sm text-neutral-mediumGray bg-neutral-lightGray border"
                            />
                        )}
                    </div>
                ))}
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
            options: PropTypes.arrayOf(PropTypes.string), // Added options prop type
            initialValue: PropTypes.any,
        })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default CreateForm;
