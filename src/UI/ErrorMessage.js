import errorMsg  from '../assets/images/error-bg.jpg';

function ErrorMessage() {
    return (
        <div className='text-center'>
            <h2 className='my-2'>Error loading page</h2>
            <h5>Please refresh the page or try again after sometime.</h5>
            <img src={errorMsg} alt='Something went wrong' className='w-50'/>
        </div>
    )
}

export default ErrorMessage;