import './TextButton.css';

function TextButton({ onClick, children }) {

    return (
        <button className='text-button' onClick={onClick}>
            <div className='foreground'>
                {children}
            </div>
        </button>
    )
}

export default TextButton;