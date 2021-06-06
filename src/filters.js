import numeral from 'numeral';

const valueCripto = (value) => {
    console.log('Aqui')
    if (!value) {
        return '$ 0'
    } 
    return numeral(value).format('($ 0.00a)')
}
const percentCripto = (value) => {
    console.log('Aqui')
    if (!value) {
        return '0 %'
    } 
    return `${Number(value).toFixed(2)}%`
}

console.log(valueCripto(100))

export {valueCripto, percentCripto};