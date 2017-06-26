import React from 'react';

const Input = (field) => (
  <div className="margin__top--sm">
    <input {...field.input} type={field.type}/>
    {field.meta.touched &&
     field.meta.error &&
     <span className="error">{field.meta.error}</span>}
  </div>
);

export default Input;
