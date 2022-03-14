function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [balance, setBalance] = React.useState('');
  //const ctx = React.useContext(UserContext);
  const user = React.useContext(UserContext)[0];
  React.useEffect(() => {
    if (user.isAuthorized) {setShow(false)};
  },[]);
  
  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={user.isAuthorized ?
        (show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} setBalance={setBalance}/> :
        <BalanceMsg setShow={setShow} user = {user}/>) :
        <BalanceLoginButton/>
      }
    />
  )

}
function BalanceLoginButton(props) {
  return(<>
    <h4>You need to be logged in to retrieve balance information.</h4>
    <a href='#/login/'>
      <button type="submit"
      className="btn btn-light card-btn">Login</button>
    </a>
  </>)
}

function BalanceMsg(props) {
  return(<>
    <p>Checking Balance: ${props.user.checking}</p>
    <p>Savings Balance: ${props.user.savings}</p>
    <a href='#/deposit/'>
    <button type="submit" 
      className="btn btn-light card-btn">Deposit
    </button>
    </a>
    <a href='#/withdraw/'>
    <button type="submit" 
      className="btn btn-light card-btn">Withdraw
    </button>
    </a>
    <a href='#/transfer/'>
    <button type="submit" 
      className="btn btn-light card-btn">Transfer
    </button>
    </a>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');

  function handle(){
    const url = `/account/balance/${email}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data)
      props.setBalance(data.balance);
    })();
    props.setShow(false);
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}