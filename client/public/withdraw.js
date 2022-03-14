function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const user = React.useContext(UserContext)[0];
  console.log(`in Withdraw: user is ${JSON.stringify(user)}`)
  
  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={user.isAuthorized?
        (show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} user={user}/>) :
        <WithdrawLoginButton/>
      }
    />
  )
}

function WithdrawLoginButton(props) {
  return(<>
    <h4>You need to be logged in to perform transactions.</h4>
    <a href='#/login/'>
      <button type="submit"
      className="btn btn-light card-btn">Login</button>
    </a>
  </>)
}

function WithdrawMsg(props){
  return(<>
    <h5>Withdrawal Successful!</h5>
    <p>Checking Balance: ${props.user.checking}</p>
    <p>Savings Balance: ${props.user.savings}</p>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const user = React.useContext(UserContext)[0];  

  function handle(acctType){
    console.log(email,amount);

    if (parseInt(amount) < 0 || parseInt(amount) == NaN) {
      props.setStatus('Withdrawal amount must be a number greater than zero.')
      return;      
    }

    let url = '';
    if (acctType == 'checking') {
      if (Number(amount) > user.checking) {
        props.setStatus('Withdrawal amount exceeds balance.');
        return;
      }
      user.checking = user.checking - Number(amount);
      url = `/account/update/checking/${user.email}/${user.checking}`;
    }

    if (acctType == 'savings') {
      if (Number(amount) > user.savings) {
        props.setStatus('Withdrawal amount exceeds balance.');
        return;
      }
      user.savings = user.savings - Number(amount);
      url = `/account/update/savings/${user.email}/${user.savings}`;
    }

    (async () => {
      var res = await fetch(url);
      var data = await res.json();
    })()

    console.log(user);
    props.setStatus('');      
    props.setShow(false);
  }


  return(<>
    <p>Checking Balance: ${user.checking}</p>
    <p>Savings Balance: ${user.savings}</p>
    Withdrawal Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <p>From which account?</p>
    <button type="submit" 
      className="btn btn-light card-btn" 
      onClick={() => handle('checking')}>Checking</button>
    <button type="submit" 
      className="btn btn-light card-btn" 
      onClick={() => handle('savings')}>Savings</button>
  </>);
}
