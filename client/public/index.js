function Spa() {
  return (
    <HashRouter>
      <div>
        <NavBar/>
        <UserContext.Provider value={[{name:"None", isAuthorized: false, type: "customer"}]}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/logout/" component={Logout} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/transfer/" component={Transfer} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            {/* <Route path="/balance/" component={Balance} /> */}
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
