import noData  from '../assets/images/no-data.png';

function NoDataFound() {
    return (
        <div className='text-center'>
            <img src={noData} alt='No Records available' className='w-50'/>
        </div>
    )
}

export default NoDataFound;