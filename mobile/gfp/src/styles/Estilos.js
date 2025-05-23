export const corPrincipal = '#219653'
export const corSecundaria = '#6FCF97'
export const corTexto = '#333333'
export const corFundo = '#F9FAFB'
export const corFundo2 = '#7FFFD4'

const Estilos = {
    conteudo: {
        flex: 1,
        Width: '100%',
        beackgroundColor: corFundo,
    },
    conteudoHeader: {
        flex: 1,
        beackgroundColor: corPrincipal,
},
    conteudoCorpo: {
        flex: 1,
        beackgroundColor: corFundo2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
    },
    imagemLista: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    itemLista: {
        flexDirection: 'row',
        alignItems: 'center',
        borderButtonWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 7,
    },
    textContainer: {
        flex: 1,
    },
    nomeLista: {
        fontSize: 16,
        fontWeight: 'bold',
        color: corTexto,
    },

    inputCad: {
        marginTop: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        breakgroundColor: '#fff',
    }
}

export default Estilos;