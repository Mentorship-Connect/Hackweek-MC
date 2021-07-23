import React from 'react';

//form helper. handles error validations and form buttons
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const {
        cancel,
        submit,
        submitButtonText,
        elements,
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            {elements()}
            <div className="grid-100 pad-bottom">
            <button className="button" type="submit">{submitButtonText}</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
        </div>
    );
}