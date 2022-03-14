function AllData(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [data, setData] = React.useState('');

  return (
    <Card
      bgcolor="info"
      header="All User Data"
      status={status}
      body={data.length == 0 ?
        <GetData setData={setData} setStatus={setStatus}/> :
        show ?
        <AllDataForm setShow={setShow} setStatus={setStatus} setData={setData} users={data}/> :
        <AllDataMsg setShow={setShow} setData = {setData} users={data}/>
      }
    />
  )
}

function GetData(props) {
  console.log('inside getData');
  const user = React.useContext(UserContext)[0];
  let url;
  if (!user.isAuthorized) {
    return(<>
      <h4>You need to be logged in to retrieve information.</h4>
      <a href='#/login/'>
        <button type="submit"
        className="btn btn-light card-btn">Login</button>
      </a>
    </>)
  }
  if (user.type == "admin") {
    url = `/account/all`;
  } else {
    url = `/account/user/${user.email}`;
  }

  (async () => {
    var res = await fetch(url);
    var udata = await res.json();
    console.log(udata)
    console.log(`data is an array: ${Array.isArray(udata)}`)
    props.setData(udata);
  })();
 
  return(<>
    <h4>Fetching data...</h4>
  </>)
}

function AllDataMsg(props) {
  //fetch all accounts from API
  return(<>
    <h4>Getting data...</h4>
  </>)
}
function AllDataForm(props) {
  console.log(`inside AllDataForm and users is ${props.users}`);
  console.log(props.users)
  let users = [];
  if (!Array.isArray(props.users)) {
    users.push(props.users);
  } else {
    users = props.users;
  }
  console.log('now users is');
  console.log(users);
  return (<>
      <div>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Checking</th>
            <th>Savings</th>
            <th>Type</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>${user.checking}</td>
              <td>${user.savings}</td>
              <td>{user.type}</td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
      </>
  )
}
