// Lexer: convert the code in tokens

enum TokenType {
    NUMBER = "NUMBER",
    PLUS = "PLUS",
    MINUS = "MINUS",
    MULTIPLY = "MULTIPLY",
    DIVIDE = "DIVIDE",
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

class Lexer {
    text: string
    current_char: string | null
    current_position: number

    constructor(text: string) {
        this.text = text
        this.current_position = 0
        this.current_char = this.current_position < this.text.length ? this.text[this.current_position] : null
    }

    advance() {
        this.current_position++
        this.current_char = this.current_position < this.text.length ? this.text[this.current_position] : null
    }

    skipWhitespace() {
        while (this.current_char !== null && /\s/.test(this.current_char) && this.current_char !== '\n') {
            this.advance()
        }
    }

    readNumber() {
        let result = ''
        while (this.current_char !== null && /[0-9]/.test(this.current_char)) {
            result += this.current_char
            this.advance()
        }
        return new Token(TokenType.NUMBER, result)
    }

    readKeywordOrId() {
        let result = ''
        while (this.current_char !== null && /[a-zA-Z0-9_]/.test(this.current_char)) {
            result += this.current_char
            this.advance()
        }
        
        if (result === 'var') return new Token(TokenType.VAR, result)
    
        return new Token(TokenType.ID, result)
    }

    getNextToken(): Token {
        while (this.current_char !== null) {
            
            if (/\s/.test(this.current_char)) {
                if (this.current_char === '\n') {
                    this.advance()
                    return new Token(TokenType.NEWLINE)
                }
                this.skipWhitespace()
                continue
            }

            if (this.current_char === '+') {
                this.advance()
                return new Token(TokenType.PLUS)
            }

            if (this.current_char === '-') {
                this.advance()
                return new Token(TokenType.MINUS)
            }

            if (this.current_char === '*') {
                this.advance()
                return new Token(TokenType.MULTIPLY)
            }

            if (this.current_char === '/') {
                this.advance()
                return new Token(TokenType.DIVIDE)
            }

            if (this.current_char === '(') {
                this.advance()
                return new Token(TokenType.LPAREN)
            }

            if (this.current_char === ')') {
                this.advance()
                return new Token(TokenType.RPAREN)
            }

            if (this.current_char === '=') {
                this.advance()
                return new Token(TokenType.ASSIGN)
            }

            if (/[0-9]/.test(this.current_char)) {
                return this.readNumber()
            }

            if (/[a-zA-Z_]/.test(this.current_char)) {
                return this.readKeywordOrId()
            }

            throw new Error(`Caractere inesperado: ${this.current_char}`)
        }

        return new Token(TokenType.EOF)
    }
}

export { Lexer, Token, TokenType }