const uniswapParser = require('./parseUniswap').parse;
const contracts = require('../constants/contracts');
const abiDecoder = require('abi-decoder');
const opensea_abi = require('../constants/abis/opensea').opensea;
const uniswap_abi = require('../constants/abis/uniswap').uniswap;
const erc20_abi = require('../constants/abis/erc20').erc20;
const goblin_abi = require('../constants/abis/goblintown').goblin;
const balancer_abi = require('../constants/abis/balancer').balancer;
const ens_abi = require('../constants/abis/ens').ens;
const superrare_abi = require('../constants/abis/superrare').superRare;
const link_abi = require('../constants/abis/linkaggr').linkagr;
const people = require('../constants/people').people;
const Web3 = require('web3');

abiDecoder.addABI(goblin_abi);
abiDecoder.addABI(erc20_abi);
abiDecoder.addABI(opensea_abi);
abiDecoder.addABI(ens_abi);
abiDecoder.addABI(superrare_abi);
abiDecoder.addABI(link_abi);

for(var i = 0; i < uniswap_abi.length; i++) {
    abiDecoder.addABI(uniswap_abi[i]);
}

counter = {};
const handleTx = (tx) => {

    if(counter[tx.to])
        counter[tx.to] += 1;
    else
        counter[tx.to] = 1;

    if (tx.input != '0x') 
    {
        const decodedInput = abiDecoder.decodeMethod(tx.input);
        if(decodedInput != undefined) 
        {
            console.log('\n', tx.to);
            printDecoded(decodedInput);
        }
        else 
        {
            console.log('\n\x1b[41m', tx.to, '\x1b[0m');
        }
    }

    isPerson(tx);
   

    
    return null;
};

process.on('SIGINT', function() {
    const sorted = sortProperties(counter);
    console.log(sorted);
    const time = Date.now().toString();
    var fs = require('fs');
    fs.writeFileSync('logs/' + time + '.txt', sorted.join('\n'));
    process.exit();
});


const isPerson = (tx) => {
    for(var i = 0; i < people.length; i++) {
        if(tx.to == people[i][1]) {
            console.log(`${people[i][1]}`);
            return true;
        }
    }
    return false;
};
const printDecoded = (decodedInput) => {
    console.log(`function:\t${decodedInput.name}\narguments:`);
    for(var i = 0; i < decodedInput.params.length; i++) {
        console.log(`\t${decodedInput.params[i].name}: ${decodedInput.params[i].value} `);   
    }
};

function sortProperties(obj)
{
  // convert object into array
	var sortable=[];
	for(var key in obj)
		if(obj.hasOwnProperty(key))
			sortable.push([key, obj[key]]); // each item is an array in format [key, value]
	
	// sort items by value
	sortable.sort(function(a, b)
	{
	  return a[1]-b[1]; // compare numbers
	});
	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}


module.exports = {
    handleTx: handleTx
}