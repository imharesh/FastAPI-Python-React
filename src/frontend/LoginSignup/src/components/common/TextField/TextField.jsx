import styles from './TextField.module.css';

export const TextField = ({ 
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  error,
  ...props 
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        className={`${styles.input} ${error ? styles.error : ''}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};

export default TextField;