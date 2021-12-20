export const currencies = [
    {name: 'AUD', color: '#4c061d'},
    {name: 'AZN', color: '#d17a22'},
    {name: 'GBP', color: '#b4c292'},
    {name: 'AMD', color: '#736f4e'},
    {name: 'BYN', color: '#3b3923'},
    {name: 'BGN', color: '#4c5b61'},
    {name: 'BRL', color: '#2c423f'},
    {name: 'HUF', color: '#574f2a'},
    {name: 'HKD', color: '#1c3a13'},
    {name: 'DKK', color: '#394f49'},
    {name: 'USD', color: '#dbc2cf'},
    {name: 'EUR', color: '#9fa2b2'},
    {name: 'INR', color: '#3c7a89'},
    {name: 'KZT', color: '#2e4756'},
    {name: 'CAD', color: '#16262e'},
    {name: 'KGS', color: '#802392'},
    {name: 'CNY', color: '#a5f8d3'},
    {name: 'MDL', color: '#684551'},
    {name: 'NOK', color: '#402e2a'},
    {name: 'PLN', color: '#9cd08f'},
    {name: 'RON', color: '#393d3f'},
    {name: 'XDR', color: '#d5bbb1'},
    {name: 'SGD', color: '#9cc4b2'},
    {name: 'TJS', color: '#c98ca7'},
    {name: 'TRY', color: '#e76d83'},
    {name: 'TMT', color: '#ff206e'},
    {name: 'UZS', color: '#fbff12'},
    {name: 'UAH', color: '#c84630'},
    {name: 'CZK', color: '#e03616'},
    {name: 'SEK', color: '#cc5803'},
    {name: 'CHF', color: '#8fbfe0'},
    {name: 'ZAR', color: '#7c77b9'},
    {name: 'KRW', color: '#1d8a99'},
    {name: 'JPY', color: '#0bc9cd'}
]
export const colorMap = currencies.reduce((prev: { [key: string]: string }, current) => {
    prev[current["name"]] = current["color"]
    return prev
}, {})

export const currenciesList = currencies.map(i => i["name"])
