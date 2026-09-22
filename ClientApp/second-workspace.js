import {
    DockviewComponent,
    themeLight
} from "dockview";


/* 
   GLOBAL TAB COUNTER
 */

let tabCounter = 1;


/* 
   FX RATES DATA

   i take it  as a array of objects
 */

const fxRates = [

    {
        pair: "EUR/USD",
        action: "Sell EUR",
        valueBefore: "1.08",
        bigValue: "19",
        valueAfter: "9",
        direction: "up",
        size: "4.4"
    },

    {
        pair: "GBP/USD",
        action: "Sell GBP",
        valueBefore: "1.26",
        bigValue: "42",
        valueAfter: "8",
        direction: "up",
        size: "2.0"
    },

    {
        pair: "USD/JPY",
        action: "Sell USD",
        valueBefore: "149.",
        bigValue: "11",
        valueAfter: "0",
        direction: "down",
        size: "3.3"
    },

    {
        pair: "USD/CHF",
        action: "Sell USD",
        valueBefore: "0.88",
        bigValue: "40",
        valueAfter: "6",
        direction: "down",
        size: "4.5"
    },

    {
        pair: "USD/CAD",
        action: "Sell USD",
        valueBefore: "1.39",
        bigValue: "19",
        valueAfter: "",
        direction: "up",
        size: "3.2"
    },

    {
        pair: "AUD/USD",
        action: "Sell AUD",
        valueBefore: "0.78",
        bigValue: "78",
        valueAfter: "",
        direction: "up",
        size: "2.7"
    },

    {
        pair: "NZD/USD",
        action: "Sell NZD",
        valueBefore: "0.67",
        bigValue: "31",
        valueAfter: "",
        direction: "down",
        size: "2.4"
    },

    {
        pair: "EUR/JPY",
        action: "Sell EUR",
        valueBefore: "159.",
        bigValue: "70",
        valueAfter: "",
        direction: "down",
        size: "3.0"
    }

];


/*
   ORDER BLOTTER DATA
 */

const orderRows = [

    {
        side: "SELL",
        symbol: "AMD",
        type: "LMT",
        price: "162.12",
        notional: "266.85K",
        status: "CANCEL",
        time: "05:27"
    },

    {
        side: "BUY",
        symbol: "GOOGL",
        type: "LMT",
        price: "141.70",
        notional: "272.63K",
        status: "FILLED",
        time: "03:36"
    },

    {
        side: "BUY",
        symbol: "TSLA",
        type: "STP",
        price: "250.93",
        notional: "439.63K",
        status: "CANCEL",
        time: "02:09"
    },

    {
        side: "SELL",
        symbol: "INTC",
        type: "MKT",
        price: "44.22",
        notional: "43.11K",
        status: "FILLED",
        time: "19:56"
    },

    {
        side: "SELL",
        symbol: "GOOGL",
        type: "LMT",
        price: "141.63",
        notional: "223.07K",
        status: "FILLED",
        time: "18:54"
    },

    {
        side: "BUY",
        symbol: "AMD",
        type: "STP",
        price: "169.13",
        notional: "74.92K",
        status: "PARTIAL",
        time: "18:19"
    }

];


/* 
   VOLATILITY SURFACE DATA
    */

const volColumns = [
    "10dP",
    "25dP",
    "ATM",
    "25dC",
    "10dC"
];


const volRows = [

    {
        tenor: "1W",
        values: [13.3, 10.4, 9.6, 10.4, 12.3]
    },

    {
        tenor: "2W",
        values: [14.3, 12.3, 10.9, 11.3, 14.2]
    },

    {
        tenor: "1M",
        values: [15.9, 14.2, 11.8, 12.7, 16.1]
    },

    {
        tenor: "2M",
        values: [17.8, 15.5, 12.7, 14.6, 17.6]
    },

    {
        tenor: "3M",
        values: [19.7, 16.4, 14.1, 16.5, 18.5]
    },

    {
        tenor: "6M",
        values: [21.0, 17.3, 16.0, 18.0, 19.4]
    },

    {
        tenor: "1Y",
        values: [21.9, 18.7, 17.9, 18.9, 20.6]
    }

];