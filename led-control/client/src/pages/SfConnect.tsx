import { useState } from 'react';



function SfConnect() {

    
    const [accounts, setAccounts] = useState<any[]>([]);
    

    const getAccounts = () => {
    }

    return(
        <div>
            <h1>Salesforce accounts</h1>
            <button onClick={getAccounts}>Click to get accounts</button>
            {/* <ul>
                {accounts.map((account) => (
                    <li key={account.Id}>{account.Name}</li>
                ))}
            </ul> */}
        </div>
    )
}

export default SfConnect;