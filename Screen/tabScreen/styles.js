import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    navbar: {
        flexDirection: 'row',
        padding: 16,
    },

    navbarTitle: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    headerText: {
        color: '#111',
        fontSize: 32,
        marginVertical: 16,
    },

    mainContaier: {
        flex: 2,
        // backgroundColor: '#E0E0E0',
        marginHorizontal: 16,
    },

    itemRow: {
        flexDirection: 'row',
        paddingVertical: 20,
    },

    itemImage: {
        width: 36,
        height: 36,
        marginRight: 16,
        borderRadius: 30,
    },
    searchBox: {
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        alignItems: 'center',
        height: 64,
        paddingHorizontal: 19,
        borderRadius: 8,
        // paddingVertical: 23,
    },

    searchBoxIcon: {
        width: 18.71,
        height: 18.71,
    },
    placeholder: {
        marginLeft: 19,
        fontSize: 16,
        color: '#111',
    },

    categoryContainer: {
        width: 88,
        height: 88,
        marginRight: 10,
        marginTop: 16,
        marginBottom: 24,
        borderRadius: 8,
        flex: 1,
    },
    categoryContainerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    categoryContainerTextBox: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        paddingHorizontal: 8,
        // left: 8,
        // right: 8,
        height: '40%',
        borderRadius: 8,
    },
    categoryContainerText: {
        color: '#fff',
    },

    productContainer2: {
        bottom: 0,
        flex: 1,
    },

    categoryContainer2: {
        backgroundColor: '#F5F5F5',
        height: 100,
        marginBottom: 16,
        borderRadius: 8,
        flexDirection: 'row',
    },
    categoryContainerImage2: {
        height: '100%',
        width: 82,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        position: 'absolute',
        right: 0,
    },
    categoryContainerTextBox2: {
        marginTop: 16,
        marginLeft: 16,
    },
    categoryContainerText2: {
        color: '#111',
    },
});

export default styles;
