function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const user = React.useContext(UserContext)[0];
  console.log(`in Deposit: user is ${JSON.stringify(user)}`);

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={user.isAuthorized ?
        (show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} user={user}/>) :
        <DepositLoginButton/>
      }
    />
  )
}

function DepositLoginButton(props) {
  return(<>
    <h4>You need to be logged in to perform transactions.</h4>
    <a href='#/login/'>
      <button type="submit"
      className="btn btn-light card-btn">Login</button>
    </a>
  </>)
}

function DepositMsg(props){
  return (<>
    <h5>Deposit Successful!</h5>
    <p>Checking Balance: ${props.user.checking}</p>
    <p>Savings Balance: ${props.user.savings}</p>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [amount, setAmount] = React.useState('');
  const user = React.useContext(UserContext)[0];

  function handle(acctType){
    console.log(`in depositform handle function.  acctType is ${acctType}`)
    //console.log(email,amount);
    if (parseInt(amount) < 0 || parseInt(amount) == NaN) {
      props.setStatus('Deposit amount must be a number greater than 0');
      return;      
    }

    let url = '';
    if (acctType == 'checking') {
      user.checking = user.checking + Number(amount);
      url = `/account/update/checking/${user.email}/${user.checking}`;
    }
    
    if (acctType == 'savings') {
      user.savings = user.savings + Number(amount);
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

    Deposit Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <p>To which account?</p>
    <button type="submit" 
      className="btn btn-light card-btn" 
      onClick={() => handle('checking')}>Checking</button>

    <button type="submit" 
      className="btn btn-light card-btn" 
      onClick={() => handle('savings')}>Savings</button>

  </>);
}