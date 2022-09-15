import loader  from '../assets/images/loader.gif';

function Loader() {
    return (
        <div className='text-center loader-wrap'>
            <img src={loader} alt='Loading...'/>
        </div>
    )
}

export default Loader;