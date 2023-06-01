/**
 * The function uses the Viacep API to retrieve and display address information based on a given
 * Brazilian zip code (CEP).
 * @param cep - The parameter "cep" is a string representing a Brazilian postal code (CEP).
 * @returns The function `buscaEndereco` is returning the object `consultaCEPConvertida`, which
 * contains the information retrieved from the API about the address related to the input CEP.
 */

async function buscaEndereco(cep){
    const msgErro = document.getElementById('erro');
    msgErro.innerHTML = "";

    try{
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if(consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }; 
        const cidade = document.getElementById('cidade');
        const logradouro = document.getElementById('endereco');
        const estado = document.getElementById('estado');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida
    }catch(erro) {
        msgErro.innerHTML = '<p>CEP Inválido. Tente Novamente!</p>'
        console.log(erro);
    };
};

const cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));