// Lexer: convert the code in tokens

enum TokenType {
    NUMBER = "NUMBER",
    PLUS = "PLUS",
    LPAREN = "LPAREN",
    RPAREN = "RPAREN",
    EOF = "EOF",
    NEWLINE = "NEWLINE",
    VAR = "VAR",
    ID = "ID",
    ASSIGN = "ASSIGN",
}

class Token {
    constructor(public type: string, public value: string | null = null) { }
}

// The code "var x = 5" is converted to [VAR, ID("x"), ASSIGN, NUMBER("5")]

class Lexer {
    text: string
    current_char: string | null
    current_position: number
    tokens: Token[]

    constructor(text: string){
        this.text = text // source code
        this.current_position = 0 
        this.current_char = this.current_position < this.text.length ? this.text[this.current_position] : null
        this.tokens = []

    }

    skip(){
        this.current_position++
        this.current_char = this.current_position < this.text.length ? this.text[this.current_position] : null
    }

    isWhiteSpace(char: string | null){
        if (char == null)
            return false;

        return /\s/.test(char);
    }

    readKeyword(){
        let resultKeyword = ''
        while(this.current_char != null && (/[a-zA-Z0-9_]/.test(this.current_char))){
            resultKeyword += this.current_char;
            this.skip()
        }
        return resultKeyword
    }

    readNumber() {
        let result = ''
        while (this.current_char != null && /[0-9]/.test(this.current_char)) {
            result += this.current_char;
            this.skip()
        }
        return result
    }

    isKeyword(char: string | null){
        if (char === null) return false;
        return /[a-zA-Z_]/.test(char);
    }

    decideWhatIsTheKeyword(keyword: string){
        if(keyword === "var") return TokenType.VAR
        return TokenType.ID
    }

    
    getAllTokens() {
        while (this.current_char != null) {
            // 1) Skip white spaces
            if (this.isWhiteSpace(this.current_char)) {
                this.skip()
                continue
            }

            // 2) Assign
            if (this.current_char === '=') {
                this.tokens.push(new Token(TokenType.ASSIGN))
                this.skip()
                continue
            }

            // 3) Number
            if (/[0-9]/.test(this.current_char)) {
                let num = this.readNumber()
                this.tokens.push(new Token(TokenType.NUMBER, num))
                continue
            }

            // 4) Keyword Identification
            if (this.isKeyword(this.current_char)) {
                let keyword = this.readKeyword()
                let type = this.decideWhatIsTheKeyword(keyword)
                if (type === TokenType.ID) {
                    this.tokens.push(new Token(type, keyword))
                } else {
                    this.tokens.push(new Token(type))
                }
                continue
            }

            this.skip()
        }
    }

}