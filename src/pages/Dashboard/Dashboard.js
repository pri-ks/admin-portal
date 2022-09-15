import wip  from '../../assets/images/wip.png';

function Dashboard() {
    return (
        <div className='wip-img'>
            <h2>This page is under construction</h2>
            <h5>Please come back later!</h5>
            <img src={wip} alt='This page is under construction' />
        </div>
    )
}

export default Dashboard;