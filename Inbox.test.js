const assert = require('assert'); //making assertions regarding tests
const ganache = require('ganache-cli');// local ethereum test n/w
const Web3 = require('web3');//caps because a constructor function //class 
//require('events').EventEmitter.prototype._maxListeners = 100;
const provider = ganache.provider();
const web3 = new Web3(provider);


const {interface, bytecode} = require('../compile');
const initialMessage = 'Hi there!';

/*class Car{
	park(){
		return 'stopped';
	}

	drive(){
		return 'vroom';
	}
}


*/
let accounts; 
let inbox;
beforeEach(async () =>{

	 //Get a list of all accounts
	 
	 accounts = await web3.eth.getAccounts()
	 inbox = await new  web3.eth.Contract(JSON.parse(interface))
	 // Use one of those accs to deploy
	 //the contract
	 .deploy({data: bytecode, arguments: [initialMessage]})
     .send({from: accounts[0], gas: '1000000'});

inbox.setProvider(provider);
});

describe('Inbox',() =>{
	it('deploys a contract', () =>{
		assert.ok(inbox.options.address);
     
	});

	it('has a default message', async() =>{
		const message = await inbox.methods.message().call();
		assert.equal(message,initialMessage);
	});

	it('can change the message', async() =>{
		await inbox.methods.setMessage('bye').send({from: accounts[0]});
		const message = await inbox.methods.message().call();
		assert.equal(message, 'bye');
	});

}); 	