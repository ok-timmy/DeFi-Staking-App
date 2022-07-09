require ('babel-polyfill');
require ('babel-register');

module.exports = {
    networks: {
        development:{
            host: '127.0.0.1:',
            port: '5777',
            network_id : '*' //connect to any network

        }
    },
    contract_directory: './src/contracts/',
    contract_build_directory: './src/truffle_abis',
    compilers: {
        solc: {
            version: '^0.5.0',
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}