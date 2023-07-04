function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');

  function handle() {
    fetch(`/account/findOne/${email}`)
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
        if (data.error) {
          props.setStatus(data.error);
          console.log('Error:', data.error);
        } else {
          setBalance(data.balance);  // Set the balance state with the retrieved value
          props.setStatus('');  // Clear the status message
        }
        props.setShow(false);
      })
      .catch(error => {
        props.setStatus('Error occurred while fetching data.');
        console.log('Error:', error);
      });
  }

  return (
    <div>
      Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
      <button onClick={handle}>Get Balance</button>
      <p>Balance: {balance}</p>  {/* Display the balance */}
      <p>Status: {props.status}</p> {/* Display the status message */}
    </div>
  );
}
