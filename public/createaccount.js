function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const user = React.useContext(UserContext)[0];
  console.log(`ctx is ${JSON.stringify(user)}`)

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow} user={user}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <p>Congratulations! New Accounts (checking and savings) created for user '{props.user.name}' with email '{props.user.email}'.</p>
    <p>As a thank you gift, $50 has been deposited into each of your new accounts.</p>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  function handle(){
    console.log(name,email,password);
    let url = `/account/create/${name}/${email}/${password}`;
    if (ctx[0].type == "admin" && ctx[0].isAuthorized) {
      url = `/account/create/admin/${name}/${email}/${password}`;
    }
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      if (res.statusText == 'OK') {
        console.log(`data is ${JSON.stringify(data)}`);
        ctx.pop()
        ctx.push(data);
      }
    })()
    .then(resolved => {
      let user = ctx[0];
      let suffix = '';
      user.isAuthorized = true;
      console.log(`user is ${JSON.stringify(user)}`)
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
      props.setShow(false);
      return;
    });
  }    

  return (<>
    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
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

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>
  </>);
}