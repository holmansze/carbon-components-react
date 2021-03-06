import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  cols: PropTypes.number,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  id: PropTypes.string,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
};

const defaultProps = {
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  placeholder: 'Hint text here',
  rows: 4,
  cols: 50,
  invalid: false,
};

const Textarea = ({
  className,
  id,
  labelText,
  onChange,
  onClick,
  invalid,
  invalidText,
  ...other
}) => {
  const textareaProps = {
    id,
    onChange: evt => {
      if (!other.disabled) {
        onChange(evt);
      }
    },
    onClick: evt => {
      if (!other.disabled) {
        onClick(evt);
      }
    },
  };

  const textareaClasses = classNames('bx--text-area', className);
  const label = labelText
    ? <label htmlFor={id} className="bx--label">
        {labelText}
      </label>
    : null;

  const error = invalid
    ? <div className="bx--form-requirement">
        {invalidText}
      </div>
    : null;

  const input = invalid
    ? <textarea
        {...other}
        {...textareaProps}
        className={textareaClasses}
        data-invalid
      />
    : <textarea {...other} {...textareaProps} className={textareaClasses} />;

  return (
    <div className="bx--form-item">
      {label}
      {input}
      {error}
    </div>
  );
};

Textarea.propTypes = propTypes;
Textarea.defaultProps = defaultProps;

export default Textarea;
