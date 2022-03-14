function Logout(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const user = React.useContext(UserContext)[0];
  
  return (
    <Card
      bgcolor="secondary"
      header="Logout"
      status={status}
      body={user.isAuthorized ?
        (show ?
        <LogoutForm setShow={setShow} setStatus={setStatus} user={user}/> :
        <LogoutMsg setShow={setShow} setStatus={setStatus} user={user}/>) :
        <LogoutMsg setShow={setShow} setStatus={setStatus} user={user}/>}
    />
  ) 
}

function LogoutMsg(props) {
  return(<>
    <h5>Successfully logged out!</h5>
    <a href='#/login/'>
    <button type="submit" 
      className="btn btn-light card-btn">Login
    </button>
    </a>
  </>);
}

function LogoutForm(props) {
  function handle() {
    props.user.isAuthorized = false;
    props.user.name = "None";
    props.setShow(false)
    let navLinks = document.getElementsByClassName('nav-link')
    for (let link of navLinks) {
      link.classList.add('hide');
    };
    document.getElementById('nav-user-name').classList.add('hide');
    document.getElementById('nav-login').classList.remove('hide');
    document.getElementById('nav-create-account').classList.remove('hide');
    return;
  }
  return (<>
    <h3>Are you sure you want to log out?</h3>
    <button type="submit" className="btn btn-light" onClick={handle}>Logout</button>
  </>);
}
  