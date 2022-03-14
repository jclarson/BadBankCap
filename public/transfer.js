function Transfer(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const user = React.useContext(UserContext)[0];
  console.log(`in Transfer: user is ${JSON.stringify(user)}`)
  
  return (
    <Card
      bgcolor="success"
      header="Transfer"
      status={status}
      body={user.isAuthorized?
        (show ? 
        <TransferForm setShow={setShow} setStatus={setStatus}/> :
        <TransferMsg setShow={setShow} user={user}/>) :
        <TransferLoginButton/>
      }
    />
  )
}

function TransferLoginButton(props) {
  return(<>
    <h4>You need to be logged in to perform transactions.</h4>
    <a href='#/login/'>
      <button type="submit"
      className="btn btn-light card-btn">Login</button>
    </a>
  </>)
}

function TransferMsg(props){
  return(<>
    <h5>Transfer Successful!</h5>
    <p>Checking balance: ${props.user.checking}</p>
    <p>Savings balance: ${props.user.savings}</p>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Transfer again
    </button>
  </>);
}

function TransferForm(props){
  const [amount, setAmount] = React.useState('');
  const user = React.useContext(UserContext)[0];  

  function handle(acctType){
    var res;
    var data;
    console.log(`amount to transfer: ${amount}`);

    if (parseInt(amount) < 0 || parseInt(amount) == NaN) {
      props.setStatus('Transfer amount must be a number greater than zero.')      
      return;      
    }

    let url = '';
    let url2 = '';
    if (acctType == 'checking') {
      if (Number(amount) > user.checking) {
        props.setStatus('Transfer amount exceeds balance.');
        return;
      }
      user.checking = user.checking - Number(amount);
      user.savings = user.savings + Number(amount);
      url = `/account/update/checking/${user.email}/${user.checking}`;
      url2 = `/account/update/savings/${user.email}/${user.savings}`;
    }

    if (acctType == 'savings') {
      if (Number(amount) > user.savings) {
        props.setStatus('Transfer amount exceeds balance.');
        return;
      }
      user.savings = user.savings - Number(amount);
      user.checking = user.checking + Number(amount);
      url = `/account/update/savings/${user.email}/${user.savings}`;
      url2 = `/account/update/checking/${user.email}/${user.checking}`;
    }

    (async () => {
      res = await fetch(url);
      data = await res.json();
    })();

    (async () => {
      res = await fetch(url2);
      data = await res.json();
    })();

    console.log(user);
    props.setStatus('');      
    props.setShow(false);
  }

  return(<>
    <p>Checking Balance: ${user.checking}</p>
    <p>Savings Balance: ${user.savings}</p>
    Transfer Amount<br/>
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
