function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const user = React.useContext(UserContext)[0];

  return (
    <Card
      bgcolor="secondary"
      header={"Login"}
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus} user={user}/>}
    />
  ) 
}

function LoginMsg(props){
  console.log(`justLogged is ${props.user.justLoggedIn}`);
  // if (!props.justLogged) {
  //   return window.open('#/logout', '_self');;
  // }
  props.user.justLoggedIn = false;
  return(<>
    <h5>Success!</h5>
    <p> Welcome back, {props.user.name}.</p>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  function handle(){
    if (email == '' || email == null) {
      props.setStatus('No email specified.  Please try again.');
      return;
    }
    if (password.length < 6 || email == null) {
      props.setStatus('Password too short.  Passwords should be at least 6 characters.  Please try again.');
      return;
    }
    var res;
    const url = `/account/login/${email}`;
    (async () => {
      //var res = await fetch(url);
      res = await fetch(url);
      try {
        ctx[0] = (await res.json());
        console.log(`data is ${JSON.stringify(ctx[0])}`);
      } catch (error) {
        console.log(`error when trying to push to ctx: ${error}`)
        props.setStatus(`failed to find a user account with email address '${email}'`);
        return;
      }
    })()
    .finally(() => {
      console.log(`data is still ${JSON.stringify(ctx[0])}`);

      const user = ctx[0];
      console.log(email, password);
      if (!user || user.name == "None") {
        console.log('one')      
        props.setStatus(`failed to find a user account with email address '${email}'`);
        return;      
      }
      if (user.password == password) {
        console.log('two');
        let suffix = '';
        user.isAuthorized = true;
        user.justLoggedIn = true;
        let navLinks = document.getElementsByClassName('nav-link')
        for (let link of navLinks) {
          link.classList.remove('hide');
        };
        document.getElementById('nav-login').classList.add('hide');
        document.getElementById('nav-user-name').classList.remove('hide');
        if (user.type == "admin") {
          suffix = ` (${user.type.substring(0,1).toUpperCase()})`
        } 
        document.getElementById('nav-user-name').innerText = `User: ${user.name}${suffix}`;
        props.setStatus('');
        props.setShow(false);
        console.log(`data is now ${JSON.stringify(user)}`);
        return;      
      }
      console.log('three')          
      props.setStatus('There was a problem with the password.  Please try again.');
  
    });
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email}
      onChange={e => setEmail((e.currentTarget.value).toLowerCase())}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}