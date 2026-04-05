import React from 'react';
import { Form } from 'react-bootstrap';

export default function FilterCheckbox({ label, checked, onChange }) {
  return (
    <Form.Check
      type="checkbox"
      id={`checkbox-${label}`}
      label={label}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
}