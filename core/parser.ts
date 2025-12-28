import { Lexer, Token, TokenType } from "./lexer";

class Parser {
    lexer: Lexer
    current_token: Token

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.current_token = lexer.getNextToken();
    }

    processToken(type: TokenType){
        if(this.current_token.type == type){
            this.current_token = this.lexer.getNextToken();
        } else {
            console.log("Error: " + this.current_token.type + " != " + type);
        }
    }

}