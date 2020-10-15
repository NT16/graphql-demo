const graphql = require('graphql');
const _ = require('lodash');

//Describe the Object types like Book/ Author
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

//dummy data
let booksLibrary = [
    { name: 'first book', genre: 'rtt', id: '1', authorId: '1'},
    { name: 'second book', genre: 'tyu', id: '2', authorId: '2'},
    { name: 'third book', genre: 'ghj', id: '3', authorId: '3'},
    { name: 'fourth book', genre: 'ghj', id: '4', authorId: '2'},
    { name: 'fifth book', genre: 'ghj', id: '5', authorId: '3'},
    { name: 'sixth book', genre: 'ghj', id: '6', authorId: '3'}
];

let authorsData = [
    {name: 'Q w', age: 18, id: '1'},
    {name: 'AZ b', age: 23, id: '2'},
    {name: 'Ezb', age: 45, id: '3'},
];
//

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: {type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find( authorsData, { id: parent.authorId})
            }
        }
    })
});
//the above object defines the  BookType
//fields : eg  id, genre
//is a function that returns an object because when we have multiple types, with refrences to each other, we need to know how to map them to each other, so wrapping this in a function helps there .

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: {type: GraphQLInt },
        books: {
            type: new GraphQLList( BookType),
            resolve(parent, args){
                return _.filter( booksLibrary, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve( parent, args){
                //code to get data from db/ other source
                //args.id
                return _.find(booksLibrary, { id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find( authorsData, { id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return booksLibrary;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authorsData;
            }
        }
    }
});
//the fields for a rootquery will be all the entry points into the graph. Say getAllAuthors, getBook, getAuthor

module.exports = new GraphQLSchema({
    query: RootQuery
});
//this object is the initial query