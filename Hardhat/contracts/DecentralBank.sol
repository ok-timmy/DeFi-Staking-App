//SPDX-License-Identifier: MIT-Modern-Variant

pragma solidity >=0.7.0 <0.9.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;

    Tether public tether;
    RWD public rwd;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Tether _tether, RWD _rwd ) {
        tether = _tether;
        rwd = _rwd;
        owner = msg.sender;
    }

    //Staking Function
    function depositTokens(uint256 _amount) public payable {
        require(_amount > 0, "Amount Cannot be 0 or Less");
        // Transfer tether token to this contract address
        tether.transferFrom(msg.sender, address(this), _amount);

        //Update staking balance
        stakingBalance[msg.sender] += _amount;
        
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        
        //Update staking checker
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
    // Unstaking Function

    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        //Require the balance to be greater than 0
        require(balance>0, "Balance cannot be less than 0");

        //Transfer tokens to the specified contract address from our bank
        tether.transfer(msg.sender, balance);
        stakingBalance[msg.sender]= 0;
        isStaking[msg.sender]= false;
        hasStaked[msg.sender] = false;
    }

    //Issue Tokens
    function issueTokens() public {
        require(msg.sender == owner, "Caller Must be the owner");

        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient]/9;
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }



}


// Run the tests for the issuetokens and unstaketokens functions after sorting out the issue with the signer.
