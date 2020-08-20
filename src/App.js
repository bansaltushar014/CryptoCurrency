var instanceTokenSale;
var instanceTokenSaleAddress;
var instanceToken;
var noOfAdminTransferToken;
var Eweb3;
var account;

window.onload = function AppWeb3Connection() {
    if (window.ethereum) {
        // here goes the request for the metamask
        Eweb3 = new Web3(ethereum);
        console.log("Connected!");
        ethereum.enable();
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        if (web3.currentProvider) {
            window.web3 = new Web3(web3.currentProvider);
        } else {
            window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
        }
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    ContractInitialization();
}

function ContractInitialization() {
    $.getJSON("TokenSale.json", function (r) {
        instanceTokenSaleAddress = r.networks[5777].address;
        instanceTokenSale = new Eweb3.eth.Contract(r.abi, instanceTokenSaleAddress);
        console.log(instanceTokenSale);
    });

    $.getJSON("Token.json", function (r) {
        console.log(Eweb3.version);
        instanceToken = new Eweb3.eth.Contract(r.abi, r.networks[5777].address);
        console.log(instanceToken);
    });
}

async function getAccount() {
    // Load account data
    await Eweb3.eth.getAccounts(function (err, acnt) {
        if (err === null) {
            account = acnt;
            console.log(account);
            return true;
        }
        console.log("No accounts! ");
        return false;
    })
}

function transferTokenToContract() {
    noOfAdminTransferToken = document.getElementById("adminToken").value;
    if (noOfAdminTransferToken !== "" || noOfAdminTransferToken !== undefined) {
        getAccount()
            .then(r => {
                instanceToken.methods.transfer(instanceTokenSaleAddress, noOfAdminTransferToken)
                    .send({
                        from: account[0]
                    })
                    .then(result => {
                        console.log(result + " and account 1 is " + account[0]);
                    })
                    .catch(e => {
                        alert(JSON.stringify(e));
                    })
            })
    } else {
        alert("Enter Correct Value!");
    }
}

function buyToken() {
    noOfBuyerTransferToken = document.getElementById("buyerToken").value;
    console.log("Inside buyToken for token " + noOfBuyerTransferToken);
    if (noOfBuyerTransferToken !== "" || noOfBuyerTransferToken !== undefined) {
        getAccount()
            .then(r => {
                instanceTokenSale.methods.buyTokens(noOfBuyerTransferToken)
                    .send({
                        from: account[0],
                        value: noOfBuyerTransferToken * 1000000000000000,
                        gas: 500000 // Gas limit
                    })
                    .then(result => {
                        console.log(result);
                    })
                    .catch(e => {
                        console.log(JSON.stringify(e));
                    })
            })
    } else {
        alert("Enter Correct Value!");
    }
}
