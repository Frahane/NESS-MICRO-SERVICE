/**
 * @fileoverview Trading Automation Frontend Script
 * @version 1.2.0
 * @author PrivateNess Network Development Team
 * @license MIT
 */

(function($, window, document) {
    'use strict';

    // Centralized Configuration
    const CONFIG = {
        PAYMENT: {
            ADDRESS: "2kGY2fECeGbaQWnq2QvZ9L7ng7QkerUraMn",
            REQUIRED_NCH: 3000,
            MINIMUM_NESS: 4000
        },
        API: {
            MARKET_DATA: 'https://api.coingecko.com/api/v3/coins/markets',
            SIGNAL_ALERTS: 'https://api.cryptosignals.com/v1/signals'
        },
        BOT_USERNAMES: {
            // Bot username mappings
            'Doge_Spot_Binance': 'Stoneyard_Doge_Bot',
            'Doge_Spot_Kucoin': 'Stoneyard_Doge_Bot',
            'Doge_Spot_Okx': 'Stoneyard_Doge_Bot',

            'XRP_Spot_Binance': 'Stoneyard_XRP_Bot',
            'XRP_Spot_Kucoin': 'Stoneyard_XRP_Bot',
            'XRP_Spot_Okx': 'Stoneyard_XRP_Bot',

            'ETH_Spot_Binance': 'Stoneyard_ETH_Bot',
            'ETH_Spot_Kucoin': 'Stoneyard_ETH_Bot',
            'ETH_Spot_Okx': 'Stoneyard_ETH_Bot',
            
            'BTC_Spot_Binance': 'Stoneyard_BTC_Bot',
            'BTC_Spot_Kucoin': 'Stoneyard_BTC_Bot',
            'BTC_Spot_Okx': 'Stoneyard_BTC_Bot',

            'SOL_Spot_Binance': 'Stoneyard_SOL_Bot',
            'SOL_Spot_Kucoin': 'Stoneyard_SOL_Bot',
            'SOL_Spot_Okx': 'Stoneyard_SOL_Bot',

            'AVAX_Spot_Binance': 'Stoneyard_AVAX_Bot',
            'AVAX_Spot_Kucoin': 'Stoneyard_AVAX_Bot',
            'AVAX_Spot_Okx': 'Stoneyard_AVAX_Bot',

             //Perpetual Trading bots

            'Doge_Perpetual_Binance': 'Stoneyard_Doge_Bot',
            'Doge_Perpetual_Kucoin': 'Stoneyard_Doge_Bot',
            'Doge_Perpetual_OKX': 'Stoneyard_Doge_Bot',

            'XRP_Perpetual_Binance': 'Stoneyard_XRP_Bot',
            'XRP_Perpetual_Kucoin': 'Stoneyard_XRP_Bot',
            'XRP_Perpetual_OKX': 'Stoneyard_XRP_Bot',

            'ETH_Perpetual_Binance': 'Stoneyard_ETH_Bot',
            'ETH_Perpetual_Kucoin': 'Stoneyard_ETH_Bot',
            'ETH_Perpetual_OKX': 'Stoneyard_ETH_Bot',

            'BTC_Perpetual_Binance': 'Stoneyard_BTC_Bot',
            'BTC_Perpetual_Kucoin': 'Stoneyard_BTC_Bot',
            'BTC_Perpetual_OKX': 'Stoneyard_BTC_Bot',

            'SOL_Perpetual_Binance': 'Stoneyard_SOL_Bot',
            'SOL_Perpetual_Kucoin': 'Stoneyard_SOL_Bot',
            'SOL_Perpetual_OKX': 'Stoneyard_SOL_Bot',

            'AVAX_Perpetual_Binance': 'Stoneyard_AVAX_Bot',
            'AVAX_Perpetual_Kucoin': 'Stoneyard_AVAX_Bot',
            'AVAX_Perpetual_OKX': 'Stoneyard_AVAX_Bot',
            // Add more bot username mappings
        }
    };

    // Logging Utility
    const Logger = {
        error: function(context, error) {
            console.error(`[${context}] Error:`, error);
            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.showAlert(`Error in ${context}. Please try again.`);
            }
        }
    };


    // Bot Configurations
    const botConfigurations = {
        // Bot configurations
        'Doge_Spot_Binance': {
            name: 'Doge Spot Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_Doge_Bot'
        },
        'Doge_Spot_Kucoin': {
            name: 'Doge Spot Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_Doge_Bot'
        },
        'Doge_Spot_OKX': {
            name: 'Doge Spot Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_Doge_Bot'
        },
            //XRP
        'XRP_Spot_Binance': {
            name: 'XRP Spot Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_XRP_Bot'
        },
        'XRP_Spot_Kucoin': {
            name: 'XRP Spot Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_XRP_Bot'
        },
        'XRP_Spot_OKX': {
            name: 'XRP Spot Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_XRP_Bot'
        },

        'ETH_Spot_Binance': {
            name: 'ETH Spot Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_ETH_Bot'
        },
        'ETH_Spot_Kucoin': {
            name: 'ETH Spot Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_ETH_Bot'
        },
        'ETH_Spot_OKX': {
            name: 'ETH Spot Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_ETH_Bot'
        },

        'BTC_Spot_Binance': {
            name: 'BTC Spot Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_BTC_Bot'
        },
        'BTC_Spot_Kucoin': {
            name: 'BTC Spot Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_BTC_Bot'
        },
        'BTC_Spot_OKX': {
            name: 'BTC Spot Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_BTC_Bot'
        },

        'SOL_Spot_Binance': {
            name: 'SOL Spot Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_SOL_Bot'
        },
        'SOL_Spot_Kucoin': {
            name: 'SOL Spot Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_SOL_Bot'
        },
        'SOL_Spot_OKX': {
            name: 'SOL Spot Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_SOL_Bot'
        },

        'AVAX_Spot_Binance': {
            name: 'AVAX Spot Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_AVAX_Bot'
        },
        'AVAX_Spot_Kucoin': {
            name: 'AVAX Spot Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_AVAX_Bot'
        },
        'AVAX_Spot_OKX': {
            name: 'AVAX Spot Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_AVAX_Bot'
        },

        // Add all bot configurations following the same pattern

        'Doge_Perpetual_Binance': {
            name: 'Doge Perpetual Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_Doge_Bot'
        },
        'Doge_Perpetual_Kucoin': {
            name: 'Doge Perpetual Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_Doge_Bot'
        },
        'Doge_Perpetual_OKX': {
            name: 'Doge Perpetual Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_Doge_Bot'
        },

        'XRP_Perpetual_Binance': {
            name: 'XRP Perpetual Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_XRP_Bot'
        },
        'XRP_Perpetual_Kucoin': {
            name: 'XRP Perpetual Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_XRP_Bot'
        },
        'XRP_Perpetual_OKX': {
            name: 'XRP Perpetual Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_XRP_Bot'
        },

        'ETH_Perpetual_Binance': {
            name: 'ETH Perpetual Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_ETH_Bot'
        },
        'ETH_Perpetual_Kucoin': {
            name: 'ETH Perpetual Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_ETH_Bot'
        },
        'ETH_Perpetual_OKX': {
            name: 'ETH Perpetual Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_ETH_Bot'
        },

        'BTC_Perpetual_Binance': {
            name: 'BTC Perpetual Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_BTC_Bot'
        },
        'BTC_Perpetual_Kucoin': {
            name: 'BTC Perpetual Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_BTC_Bot'
        },
        'BTC_Perpetual_OKX': {
            name: 'BTC Perpetual Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_BTC_Bot'
        },

        'SOL_Perpetual_Binance': {
            name: 'SOL Perpetual Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_SOL_Bot'
        },
        'SOL_Perpetual_Kucoin': {
            name: 'SOL Perpetual Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_SOL_Bot'
        },
        'SOL_Perpetual_OKX': {
            name: 'SOL Perpetual Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_SOL_Bot'
        },

        'AVAX_Perpetual_Binance': {
            name: 'AVAX Perpetual Bot (Binance)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_AVAX_Bot'
        },
        'AVAX_Perpetual_Kucoin': {
            name: 'AVAX Perpetual Bot (Kucoin)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_AVAX_Bot'
        },
        'AVAX_Perpetual_OKX': {
            name: 'AVAX Perpetual Bot (OKX)',
            requiredNCH: CONFIG.PAYMENT.REQUIRED_NCH,
            minimumNESS: CONFIG.PAYMENT.MINIMUM_NESS,
            paymentAddress: CONFIG.PAYMENT.ADDRESS,
            botUsername: 'Stoneyard_AVAX_Bot'
        },
        
        // Continue with other bot configurations
    };

    // Bot Lists
    const spotBots = [
        { 
            name: 'Doge', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'Doge_Spot_Binance',
            botUsername: 'Stoneyard_Doge_Bot' 
        },
        { 
            name: 'Doge', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'Doge_Spot_Kucoin',
            botUsername: 'Stoneyard_Doge_Bot' 
        },
        { 
            name: 'Doge', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'Doge_Spot_OKX',
            botUsername: 'Stoneyard_Doge_Bot' 
        },

        { 
            name: 'XRP', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'XRP_Spot_Binance',
            botUsername: 'Stoneyard_XRP_Bot' 
        },
        { 
            name: 'XRP', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'XRP_Spot_Kucoin',
            botUsername: 'Stoneyard_XRP_Bot' 
        },
        { 
            name: 'XRP', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'XRP_Spot_OKX',
            botUsername: 'Stoneyard_XRP_Bot' 
        },

        { 
            name: 'ETH', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'ETH_Spot_Binance',
            botUsername: 'Stoneyard_ETH_Bot' 
        },
        { 
            name: 'ETH', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'ETH_Spot_Kucoin',
            botUsername: 'Stoneyard_ETH_Bot' 
        },
        { 
            name: 'ETH', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'ETH_Spot_OKX',
            botUsername: 'Stoneyard_ETH_Bot' 
        },

        { 
            name: 'BTC', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'BTC_Spot_Binance',
            botUsername: 'Stoneyard_BTC_Bot' 
        },
        { 
            name: 'BTC', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'BTC_Spot_Kucoin',
            botUsername: 'Stoneyard_BTC_Bot' 
        },
        { 
            name: 'BTC', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'BTC_Spot_OKX',
            botUsername: 'Stoneyard_BTC_Bot' 
        },

        { 
            name: 'SOL', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'SOL_Spot_Binance',
            botUsername: 'Stoneyard_SOL_Bot' 
        },
        { 
            name: 'SOL', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'SOL_Spot_Kucoin',
            botUsername: 'Stoneyard_SOL_Bot' 
        },
        { 
            name: 'SOL', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'SOL_Spot_OKX',
            botUsername: 'Stoneyard_SOL_Bot' 
        },

        { 
            name: 'AVAX', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'AVAX_Spot_Binance',
            botUsername: 'Stoneyard_AVAX_Bot' 
        },
        { 
            name: 'AVAX', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'AVAX_Spot_Kucoin',
            botUsername: 'Stoneyard_AVAX_Bot' 
        },
        { 
            name: 'AVAX', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'AVAX_Spot_OKX',
            botUsername: 'Stoneyard_AVAX_Bot' 
        },
        // Add more spot bots
    ];

    const perpetualBots = [
        { 
            name: 'Doge Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'Doge_Perpetual_Binance',
            botUsername: 'Stoneyard_Perpetual_Doge_Bot' 
        },
        { 
            name: 'Doge Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'Doge_Perpetual_Kucoin',
            botUsername: 'Stoneyard_Perpetual_Doge_Bot' 
        },
        { 
            name: 'Doge Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'Doge_Perpetual_OKX',
            botUsername: 'Stoneyard_Perpetual_Doge_Bot' 
        },

        { 
            name: 'XRP Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'XRP_Perpetual_Binance',
            botUsername: 'Stoneyard_Perpetual_XRP_Bot' 
        },
        { 
            name: 'XRP Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'XRP_Perpetual_Kucoin',
            botUsername: 'Stoneyard_Perpetual_XRP_Bot' 
        },
        { 
            name: 'XRP Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'XRP_Perpetual_OKX',
            botUsername: 'Stoneyard_Perpetual_XRP_Bot' 
        },

        { 
            name: 'ETH Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'ETH_Perpetual_Binance',
            botUsername: 'Stoneyard_Perpetual_ETH_Bot' 
        },
        { 
            name: 'ETH Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'ETH_Perpetual_Kucoin',
            botUsername: 'Stoneyard_Perpetual_ETH_Bot' 
        },
        { 
            name: 'ETH Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'ETH_Perpetual_OKX',
            botUsername: 'Stoneyard_Perpetual_ETH_Bot' 
        },

        { 
            name: 'BTC Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'BTC_Perpetual_Binance',
            botUsername: 'Stoneyard_Perpetual_BTC_Bot' 
        },
        { 
            name: 'BTC Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'BTC_Perpetual_Kucoin',
            botUsername: 'Stoneyard_Perpetual_BTC_Bot' 
        },
        { 
            name: 'BTC Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'BTC_Perpetual_OKX',
            botUsername: 'Stoneyard_Perpetual_BTC_Bot' 
        },

        { 
            name: 'SOL Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'SOL_Perpetual_Binance',
            botUsername: 'Stoneyard_Perpetual_SOL_Bot' 
        },
        { 
            name: 'SOL Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'SOL_Perpetual_Kucoin',
            botUsername: 'Stoneyard_Perpetual_SOL_Bot' 
        },
        { 
            name: 'SOL Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'SOL_Perpetual_OKX',
            botUsername: 'Stoneyard_Perpetual_SOL_Bot' 
        },
        
        { 
            name: 'AVAX Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Binance', 
            botKey: 'AVAX_Perpetual_Binance',
            botUsername: 'Stoneyard_Perpetual_AVAX_Bot' 
        },
        { 
            name: 'AVAX Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'Kucoin', 
            botKey: 'AVAX_Perpetual_Kucoin',
            botUsername: 'Stoneyard_Perpetual_AVAX_Bot' 
        },
        { 
            name: 'AVAX Perpetual', 
            price: `${CONFIG.PAYMENT.REQUIRED_NCH} NCH`, 
            exchange: 'OKX', 
            botKey: 'AVAX_Perpetual_OKX',
            botUsername: 'Stoneyard_Perpetual_AVAX_Bot' 
        },
        // Add more perpetual bots
    ];

    // Telegram WebApp Initialization
    function initTelegramWebApp() {
        try {
            const webapp = window.Telegram.WebApp;
            webapp.ready();
            webapp.expand();
            webapp.enableClosingConfirmation();
            webapp.setHeaderColor('#46a1d6');

            webapp.BackButton.show();
            webapp.BackButton.onClick(() => webapp.close());

            return webapp;
        } catch (error) {
            Logger.error('Telegram WebApp Initialization', error);
            return null;
        }
    }

    
    // Populate bot tables
    populateBotTable(spotBots, 'spot-bot-link');
    populateBotTable(perpetualBots, 'perpetual-bot-link');

    // Check Bot Access Function
    function checkBotAccess(botName) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/telegram/check_bot_access',
                method: 'POST',
                data: JSON.stringify({
                    bot_name: botName,
                    telegram_id: window.Telegram.WebApp.initDataUnsafe.user.id
                }),
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    }


    // Show Payment Modal Function
   // Show Payment Modal Function
   function showPaymentModal(botName) {
    // Create the modal HTML
    const modalHtml = `
        <div class="payment-modal" style="background-color: white; border-radius: 10px; padding: 20px; width: 300px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000;">
            <h3 style="margin: 0; font-size: 1.5em;">Access ${botName}</h3>
            <div class="payment-details" style="margin-top: 10px;">
                <p>Bot Access Requirements:</p>
                <ul style="list-style-type: none; padding: 0;">
                    <li>Send <strong>${CONFIG.PAYMENT.REQUIRED_NCH} NCH</strong> to:</li>
                    <code id="paymentAddress" style="display: block; background-color: #f9f9f9; padding: 5px; border-radius: 5px;">${CONFIG.PAYMENT.ADDRESS}</code>
                    <button id="copyAddressBtn" style="margin-top: 5px; padding: 5px; background-color: #1e90ff; color: white; border: none; border-radius: 5px; cursor: pointer;">Copy Address</button>
                    <li>Minimum NESS Balance: <strong>${CONFIG.PAYMENT.MINIMUM_NESS}</strong></li>
                </ul>
                <input type="text" id="txHash" placeholder="Transaction Hash" style="width: 100%; padding: 10px; margin-top: 10px; border: 1px solid #ccc; border-radius: 5px;">
                <button id="verifyPaymentBtn" data-bot-name="${botName}" style="margin-top: 10px; padding: 10px; background-color: #1e90ff; color: white; border: none; border-radius: 5px; cursor: pointer; width: 100%;">Verify Payment</button>
            </div>
            <button id="closeModalBtn" style="margin-top: 10px; padding: 5px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
        </div>
    `;

    // Append modal to body
    $('body').append(modalHtml);

    // Copy Address Functionality
    $('#copyAddressBtn').on('click', function() {
        const address = $('#paymentAddress').text();
        navigator.clipboard.writeText(address).then(() => {
            alert('Payment address copied to clipboard!');
        }).catch(err => {
            Logger.error('Copy Address', err);
        });
    });

    // Close Modal Functionality
    $('#closeModalBtn').on('click', function() {
        $('.payment-modal').remove(); // Remove the modal from the DOM
    });

    // Verify Payment Functionality
    $('#verifyPaymentBtn').on('click', function() {
        const botName = $(this).data('bot-name');
        const txHash = $('#txHash').val();
        verifyPayment(botName, txHash);
    });
}

   /* function showPaymentModal(botName) {
        // Simplified alert for debugging
        alert(`Access denied for ${botName}. Please send ${CONFIG.PAYMENT.REQUIRED_NCH} NCH to ${CONFIG.PAYMENT.ADDRESS} to subscribe.`);
        
        
    }*/

    // Verify Payment Function
    function verifyPayment(botName, txHash) {
        $.ajax({
            url: '/telegram/verify_bot_payment',
            method: 'POST',
            data: JSON.stringify({
                bot_name: botName,
                tx_hash: txHash,
                telegram_id: window.Telegram.WebApp.initDataUnsafe.user.id
            }),
            contentType: 'application/json',
            success: function(response) {
                if (response.success) {
                    window.Telegram.WebApp.showAlert(`Access Granted: ${botName}!`, () => {
                        openBotInterface(botName);
                    });
                } else {
                    window.Telegram.WebApp.showAlert(`Payment Verification Failed: ${response.message}`);
                }
            },
            error: function(err) {
                Logger.error('Payment Verification', err);
                window.Telegram.WebApp.showAlert('Error verifying payment. Please try again.');
            }
        });
    }

    // Open Bot Interface Function
    function openBotInterface(botName) {
        const botUsername = CONFIG.BOT_USERNAMES[botName] || 'PrivateNess_Bot';
        window.location.href = `https://t.me/${botUsername}`;
    }

    // Fetch Market Data
    function fetchMarketData() {
        $.ajax({
            url: CONFIG.API.MARKET_DATA,
            method: 'GET',
            data: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 5,
                page: 1,
                sparkline: false
            },
            success: function(data) {
                $('#market-data tbody').empty();
                data.forEach(coin => {
                    $('#market-data tbody').append(`
                        <tr class='fade-in'>
                            <td>${coin.name} (${coin.symbol.toUpperCase()})</td>
                            <td>$${coin.current_price.toLocaleString()}</td>
                            <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
                        </tr>
                    `);
                });
            },
            error: function(err) {
                Logger.error('Market Data Fetch', err);
            }
        });
    }

    // Fetch Signal Alerts
    function fetchSignalAlerts() {
        $.ajax({
            url: CONFIG.API.SIGNAL_ALERTS,
            method: 'GET',
            success: function(data) {
                $('#alerts').empty();
                data.slice(0, 5).forEach(signal => {
                    $('#alerts').append(`<div class='alert fade-in'>${signal.message}</div>`);
                });
            },
            error: function(err) {
                Logger.error('Signal Alerts Fetch', err);
            }
        });
    }

    // Fetch data on page load
    fetchMarketData();
    fetchSignalAlerts();

    // Populate Bot Table Function
    function populateBotTable(bots, tableId) {
        const tbody = $(`#${tableId} tbody`);
        tbody.empty();
        
        bots.forEach(bot => {
            const row = $(`
                <tr>
                    <td>
                        <a href="#" 
                           class="bot-link" 
                           data-bot-name="${bot.botKey}">
                            ${bot.name}
                        </a>
                    </td>
                    <td>${bot.price}</td>
                    <td>${bot.exchange}</td>
                </tr>
            `);
            tbody.append(row);
        });
    }

    // Document Ready Function
    $(document).ready(function() {
        // Attach click handlers to bot links
        $('.bot-link').on('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const botName = $(this).data('bot-name'); // Get the bot name from data attribute

            // Check access before allowing interaction
            checkBotAccess(botName)
                .then(accessResponse => {
                    console.log('Access Response:', accessResponse); // Debugging log
                    if (accessResponse.access) {
                        openBotInterface(botName); // If access is granted, open the bot interface
                    } else {
                        console.log('No active subscription, showing payment modal.'); // Debugging log
                        showPaymentModal(botName); // Show payment modal if access is denied
                    }
                })
                .catch(err => {
                    Logger.error('Bot Access Check', err);
                });
        });
    });

})(jQuery, window, document);