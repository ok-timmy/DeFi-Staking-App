//SPDX-License-Identifier: MIT-Modern-Variant

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract Tether {
    string public name = "Mock Tether Token";
    string public symbol = "USDT";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million Tokens
    uint8 decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        payable
        returns (bool success)
    {
        //require that the amount to be transferred is less than the balance available
        require(balanceOf[msg.sender] >= _value);

        //Transfer the amount
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        // console.log("Balance of %s to %s Who just receive token ", balanceOf[_to], _to);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        payable
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) payable public returns (bool success) {
        require(_value <= balanceOf[_from], "Insufficient Balance");
        require(_value <= allowance[_from][_from], "No Allowance for this action");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[msg.sender][_from] = _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
