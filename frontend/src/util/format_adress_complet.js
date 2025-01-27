export const format_address_complet = (rua, bairro, complemento, cep, cidade) => {
    return `${rua}, (${bairro}), ${complemento}, ${cep}, ${cidade}`
}