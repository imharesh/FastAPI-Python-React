import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button',
  onClick,
  disabled,
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;