//SPDX-License-Identifier: MIT-Modern-Variant

pragma solidity >=0.7.0 <0.9.0;

contract RWD {
    string public name = "Reward Token";
    string public symbol = "RWD";
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
        returns (bool success)
    {
        //require that the amount to be transferred is less than the balance available
        require(balanceOf[msg.sender] >= _value);

        //Transfer the amount
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balanceOf[msg.sender]);
        require(_value <= allowance[_from][msg.sender], "Insufficient Balance");
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        allowance[msg.sender][_from] = _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
