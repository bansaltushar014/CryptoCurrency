pragma solidity >=0.4.22 <0.7.0;

contract Token{

    string name = "Silver";
    string symbol = "Sil";
    uint256 decimals;

    mapping(address => uint256) balance;
    mapping(address => mapping(address => uint256) ) approveof;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor(uint256 _initialSupply) public{
        balance[msg.sender] = _initialSupply;
        decimals = _initialSupply;
    }

    function getBalance(address addr) public returns(uint256){
        return balance[addr];
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balance[msg.sender] >= _value);
        balance[msg.sender] -= _value;
        balance[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // This function gets called by user (not by the creator)
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
           require(balance[_from] >= _value);
           require(approveof[_from][msg.sender] >= _value);

           balance[_from] -= _value;
           balance[_to] += _value;

           // can i run this after the balance[_from]?
           approveof[_from][msg.sender] -= _value;

           emit Transfer(_from, _to, _value);
           return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success){
        approveof[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}
