const multiCallRouter1 = '0xac9650d8';
const multiCallRouter2 = '0x5ae401dc';
const addLiquidityETH = '0xf305d719';
const swapExactTokensForETHSupportingFeeOnTransferTokens = '0x791ac947';
const swapExactTokensForTokensSupportingFeeOnTransferTokens = '0x5c11d795';
const swapExactETHForTokensSupportingFeeOnTransferTokens = '0xb6f9de95';
const swapExactETHForTokens = '0x7ff36ab5';
const swapExactTokensForETH = '0x18cbafe5';
const swapExactTokensForTokens = '0x38ed1739';
const swapETHForExactTokens = '0xfb3bdb41';
const swapTokensForExactETH = '0x4a25d94a';
const swapTokensForExactTokens = '0x8803dbee';

const removeLiquidityWithPermit = '0x2195995c';

const parse = (tx) => {
    const methodID = tx.input.slice(0, 10);
    switch(methodID) {
        case addLiquidityETH:
            console.log('addLiquidityETH');
            break;
        case swapExactETHForTokens:
            console.log('swapExactETHForTokens');
            break;
        case swapExactTokensForETH:
            console.log('swapExactTokensForETH');
            break;
        case swapExactTokensForTokens:
            console.log('swapExactTokensForTokens');
            break;
        case swapExactTokensForETHSupportingFeeOnTransferTokens:
            console.log('swapExactTokensForETHSupportingFeeOnTransferTokens');
            break;
        case swapExactTokensForTokensSupportingFeeOnTransferTokens:
            console.log('swapExactTokensForTokensSupportingFeeOnTransferTokens');
            break;
        case swapExactETHForTokensSupportingFeeOnTransferTokens:
            console.log('swapExactETHForTokensSupportingFeeOnTransferTokens');
            break;
        case swapETHForExactTokens:
            console.log('swapETHForExactTokens');
            break;
        case swapTokensForExactETH:
            console.log('swapTokensForExactETH');
            break;
        case swapTokensForExactTokens:
            console.log('swapTokensForExactTokens');
            break;
        case multiCallRouter1:
            console.log('multiCall 1');
            break;
        case multiCallRouter2:
            console.log('multiCall 2');
            break;
        case removeLiquidityWithPermit:
            console.log('removeLiquidityWithPermit');
            break;
        default:
            console.log('unknown uniswap method');
            break;
    }
}


module.exports = {
    parse: parse,
}